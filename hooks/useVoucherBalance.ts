import { useAccount, useBalance, useNetwork } from "wagmi";
import { BigNumber } from "ethers";
import {
  vUSDC_ARBI_ADDRESS,
  vUSDT_ARBI_ADDRESS,
  vUSDC_FUJI_ADDRESS,
  vUSDT_FUJI_ADDRESS,
} from "../lib/contracts";

export default function ({ isvUSDC }: { isvUSDC: boolean | undefined }): {
  formatted: string;
  value: BigNumber;
} {
  const { chain: currentChain, chains } = useNetwork();
  const { address } = useAccount();

  let tokenAddress = "";
  switch (currentChain?.id) {
    // probably bad to manually encode index
    case chains?.[1]?.id: {
      tokenAddress = isvUSDC ? vUSDC_ARBI_ADDRESS : vUSDT_ARBI_ADDRESS;
      break;
    }
    case chains?.[2]?.id: {
      tokenAddress = isvUSDC ? vUSDC_FUJI_ADDRESS : vUSDT_FUJI_ADDRESS;
      break;
    }
  }

  const { data, isError, isLoading } = useBalance({
    addressOrName: address,
    token: tokenAddress,
  });

  return {
    formatted: data?.formatted ?? "0",
    value: data?.value ?? BigNumber.from(0),
  };
}
