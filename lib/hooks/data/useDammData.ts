import {
  useContractReads,
  useContractWrite,
  useNetwork,
  usePrepareContractWrite,
} from "wagmi";
import {
  ChainId,
  Currency,
  CurrencyAmount,
  DAMM_ADDRESS,
  LZ_CHAIN,
} from "../../../sdk";
import { useMemo } from "react";
import { BigNumber } from "ethers";
import { dAMM as dAMMContractInterface } from "../../../abis/dAMM";

export default function useDammData(
  currency1: Currency | undefined,
  currency2: Currency | undefined,
  totalSupplyCurrency: Currency | undefined
): {
  data: {
    reserve0: CurrencyAmount<Currency> | undefined;
    reserve1: CurrencyAmount<Currency> | undefined;
    totalSupply: CurrencyAmount<Currency> | undefined;
    marked0: CurrencyAmount<Currency> | undefined;
    marked1: CurrencyAmount<Currency> | undefined;
  } | null;
} {
  const { chain } = useNetwork();

  const dAMMContract = {
    address: DAMM_ADDRESS[ChainId.ETHEREUM_GOERLI],
    abi: dAMMContractInterface,
    chainId: ChainId.ETHEREUM_GOERLI,
  };

  const lzChainId = useMemo(() => {
    if (!chain) return;

    if (chain.id === ChainId.ARBITRUM_GOERLI) {
      return LZ_CHAIN[ChainId.ARBITRUM_GOERLI];
    }
    if (chain.id === ChainId.POLYGON_MUMBAI) {
      return LZ_CHAIN[ChainId.POLYGON_MUMBAI];
    } else {
      return 0;
    }
  }, [chain]);

  const { data, isError, isLoading } = useContractReads({
    contracts: [
      {
        ...dAMMContract,
        functionName: "reserve0",
      },
      {
        ...dAMMContract,
        functionName: "reserve1",
      },
      {
        ...dAMMContract,
        functionName: "totalSupply",
      },
      {
        ...dAMMContract,
        functionName: "marked0",
        args: [lzChainId!],
      },
      {
        ...dAMMContract,
        functionName: "marked1",
        args: [lzChainId!],
      },
    ],
    watch: true,
    enabled: !!lzChainId,
  });

  if (
    !data?.[0] ||
    !data?.[1] ||
    !data?.[2] ||
    !data?.[3] ||
    !data?.[4] ||
    !currency1 ||
    !currency2 ||
    !totalSupplyCurrency
  )
    return { data: null };

  return {
    data: {
      reserve0: CurrencyAmount.fromRawAmount(
        currency1,
        (data[0] as BigNumber).toString()
      ),
      reserve1: CurrencyAmount.fromRawAmount(
        currency2,
        (data[1] as BigNumber).toString()
      ),
      totalSupply: CurrencyAmount.fromRawAmount(
        totalSupplyCurrency,
        (data[2] as BigNumber).toString()
      ),
      marked0: CurrencyAmount.fromRawAmount(
        currency1,
        (data[3] as BigNumber).toString()
      ),
      marked1: CurrencyAmount.fromRawAmount(
        currency2,
        (data[4] as BigNumber).toString()
      ),
    },
  };
}
