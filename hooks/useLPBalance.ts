import { useAccount, useBalance, useNetwork } from "wagmi";
import { DAMM_CONTRACT_ADDRESS } from "../lib/contracts";

export default function () {
  const { address } = useAccount();

  const { data, isError, isLoading } = useBalance({
    addressOrName: address,
    token: DAMM_CONTRACT_ADDRESS,
  });

  return {
    balance:
      parseFloat(parseFloat(data?.formatted as string).toFixed(6)).toString() ||
      "0",
  };
}