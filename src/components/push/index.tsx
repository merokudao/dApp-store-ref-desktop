import React from "react";
import { Chat, ITheme } from "@pushprotocol/uiweb";
import { useAccount } from "wagmi";
import { getWalletClient } from "@wagmi/core";
export async function SupportChat(dappDevAddress: any) {
  const { address, connector } = useAccount();
  const signer: any = await getWalletClient();
  console.log("push ready");
  return (
    <Chat
      account={address!}
      supportAddress={dappDevAddress}
      env="staging"
      signer={signer}
    />
  );
}
