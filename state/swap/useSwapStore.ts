import create from "zustand";
import produce from "immer";
import { Currency, CurrencyAmount } from "../../sdk";
import { validateNumber } from "../../lib/utils/validateNumber";
import { devtools } from "zustand/middleware";

export enum Field {
  CURRENCY_A = "CURRENCY_A",
  CURRENCY_B = "CURRENCY_B",
}

interface SwapStoreState {
  amounts: { [field in Field]?: CurrencyAmount<Currency> };
  setAmounts: (amounts: {
    [field in Field]?: CurrencyAmount<Currency>;
  }) => void;
  currencies: { [field in Field]?: Currency };
  setCurrencies: (currencies: {
    [field in Field]?: Currency;
  }) => void;
  fields: { [field in Field]: string };
  onUserInput: (field: Field, value: string) => void;
  onSwitchTokens: () => void;
  swapCurrencies: () => void;
  independentField: Field;
  clearFields: () => void;
}

export const useSwapStore = create<SwapStoreState>(
  devtools(
    (set, get) => ({
      amounts: {},
      setAmounts: (amounts) => set(() => ({ amounts: amounts })),
      currencies: {},
      setCurrencies: (currencies) => set(() => ({ currencies: currencies })),
      fields: {
        [Field.CURRENCY_A]: "",
        [Field.CURRENCY_B]: "",
      },
      onUserInput: (field: Field, value: string) => {
        set(
          produce((draft) => {
            if (validateNumber(value)) {
              draft.fields[field] = value;
              draft.independentField = field;
            }
          })
        );
      },
      onSwitchTokens: () => {},
      swapCurrencies: () => {
        set(
          produce((draft) => {
            const temp = draft.currencies[Field.CURRENCY_A];
            draft.currencies[Field.CURRENCY_A] =
              draft.currencies[Field.CURRENCY_B];
            draft.currencies[Field.CURRENCY_B] = temp;
          })
        );
      },
      independentField: Field.CURRENCY_A,
      clearFields: () =>
        set(() => ({
          fields: { [Field.CURRENCY_A]: "", [Field.CURRENCY_B]: "" },
        })),
    }),
    { name: "SwapStore" }
  )
);
