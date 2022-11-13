import React from "react";
import { useAccount, useNetwork } from "wagmi";
import {
  CustomConnectButton,
  InteractConnectButton,
} from "./CustomConnectButton";

const InteractButton = ({
  text,
  expectedChainId,
  onClick,
}: {
  text: string;
  expectedChainId: number;
  onClick: () => void;
}) => {
  const { address } = useAccount();
  const { chain } = useNetwork();

  return (
    <>
      {address ? (
        chain?.id === expectedChainId ? (
          <Button onClick={onClick} text={text} />
        ) : (
          <Button disabled text="Wrong Network" />
        )
      ) : (
        <InteractConnectButton />
      )}
    </>
  );
};

export const Button = ({
  text,
  disabled = false,
  onClick,
}: {
  text: string;
  disabled?: boolean;
  onClick?: () => void;
}) => {
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className="flex h-16 w-full  items-center justify-center rounded-sm border border-white/5 shadow-damn transition duration-500 ease-in-out hover:shadow-none disabled:shadow-none"
    >
      <p
        className={`${
          disabled
            ? "text-white/50 drop-shadow-none"
            : "text-white drop-shadow-soju"
        }`}
      >
        {text}
      </p>
    </button>
  );
};

export default InteractButton;
