import { Chat } from "@pushprotocol/uiweb";
import { ethers } from "ethers";
import { ENV } from "@pushprotocol/uiweb";
import { useEffect, useState } from "react";

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const SupportChat = (props:any) => {
  const provider = new ethers.providers.Web3Provider(window.ethereum);
  const signer = provider.getSigner();
  console.log(props.address);
  return (
    <Chat
      account={String(props.address)}
      supportAddress={props.supportAddress}
      env={ENV.STAGING}
      signer={signer}
    />
  );
};
