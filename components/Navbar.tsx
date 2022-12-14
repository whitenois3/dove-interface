import { ConnectButton } from "@rainbow-me/rainbowkit";
import React from "react";
import { CustomConnectButton } from "./CustomConnectButton";
import { FaGithub, FaTwitter } from "react-icons/fa";
import { GiPeaceDove } from "react-icons/gi";

const Navbar = () => {
  return (
    <div className="fixed z-50 flex w-full justify-center">
      <div className="flex w-full items-center justify-between px-8 py-8">
        <GiPeaceDove className="text-3xl text-white" />
        <div className="flex items-center space-x-4">
          <CustomConnectButton />
          <a href="https://github.com/whitenois3" target="_blank">
            <FaGithub className="text-white/50" />
          </a>
          <a href="https://twitter.com/exp_table" target="_blank">
            <FaTwitter className="text-white/50" />
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
