import create from "zustand";
import produce from "immer";
import { Currency, CurrencyAmount } from "../../sdk";
import { validateNumber } from "../../lib/utils/validateNumber";

export enum Field {
  CURRENCY_A = "CURRENCY_A",
  CURRENCY_B = "CURRENCY_B",
}

interface BurnStoreState {
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
  clearFields: () => void;
}

export const useBurnStore = create<BurnStoreState>((set, get) => ({
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
        }
      })
    );
  },
  onSwitchTokens: () => {},
  clearFields: () => {
    set(
      produce((draft) => {
        draft.fields[Field.CURRENCY_A] = "";
        draft.fields[Field.CURRENCY_B] = "";
      })
    );
  },
}));
