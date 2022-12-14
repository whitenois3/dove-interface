import React from "react";
import { useAccount, useNetwork } from "wagmi";
import { ChainId } from "../sdk";
import {
  CustomConnectButton,
  InteractConnectButton,
} from "./CustomConnectButton";

const InteractButton = ({
  text,
  expectedChainId,
  onConfirm,
  children,
}: {
  text: string;
  expectedChainId: ChainId | undefined;
  error?: string;
  onConfirm: () => void;
  children?: React.ReactNode;
}) => {
  const { address } = useAccount();
  const { chain } = useNetwork();

  const error = false;

  return (
    <>
      {(() => {
        if (address) {
          if (!chain) {
            return <Button disabled text="Unsupported Network" />;
          }
          if (chain?.id !== expectedChainId) {
            return <Button disabled text="Wrong Network" />;
          }
          if (error) {
            return <Button disabled text={error} />;
          }

          if (children) {
            return <>{children}</>;
          }

          return <Button onClick={onConfirm} text={text} />;
        } else {
          return <InteractConnectButton />;
        }
      })()}
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
      className="group relative flex h-16 w-full items-center justify-center rounded-sm border-y border-sky-400 bg-gradient-to-t from-sky-400/5 to-transparent transition duration-500 ease-in-out hover:shadow-none disabled:border disabled:border-white/10 disabled:bg-white/5 disabled:from-transparent disabled:shadow-none"
    >
      {!disabled && (
        <div className="background-gradient-pattern absolute top-0 h-16 w-full opacity-50 gradient-mask-t-0" />
      )}
      <p
        className={`transition duration-500 ease-in-out ${
          disabled
            ? "text-white/50 drop-shadow-none"
            : "font-normal text-white group-hover:drop-shadow-tabler"
        }`}
      >
        {text}
      </p>
    </button>
  );
};

export default InteractButton;
