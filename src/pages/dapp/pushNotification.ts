import * as PushAPI from "@pushprotocol/restapi";
import { ethers } from "ethers";

export const sendNotification = async (
  dappOwnerAddress,
  dappName,
  reviewText,
  chainId,
  cta
) => {
  const _signer = new ethers.Wallet(
    process.env.NEXT_PUBLIC_CHANNEL_PRIVATE_KEY!
  );
  console.log(cta);
  try {
    const apiResponse = await PushAPI.payloads.sendNotification({
      signer: _signer,
      type: 3, //target
      recipients: dappOwnerAddress,
      identityType: 2, // direct payload
      notification: {
        title: `Someone just left a review for your dapp ${dappName} !`,
        body: `[t: Review]: [b: ${reviewText}]`,
      },
      payload: {
        title: `Someone just left a review for your dapp ${dappName} !`,
        body: `[t: Review]: [b: ${reviewText}]`,
        cta: cta,
        img: "",
      },

      channel: `eip155:${chainId}:${process.env.NEXT_PUBLIC_PUSH_CHANNEL_ADDRESS}`, // your channel address
      env: "staging",
    });
  } catch (err) {
    console.error("Error: ", err);
  }
};
