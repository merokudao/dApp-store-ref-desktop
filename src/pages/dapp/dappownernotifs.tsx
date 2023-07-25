import { ethers } from "ethers";
import * as PushAPI from "@pushprotocol/restapi";
import { useState } from "react";
import { ENV } from "@pushprotocol/restapi/src/lib/constants";

export const OwnerDashboard = (props: any) => {
  const [notification, setNotification] = useState<string>("");
  const [notificationStyle, setNotificationStyle] = useState<string>("1");
  const [targetAddress, setTargetAddress] = useState<string>("");
  const [addressList, setAddressList] = useState<string[]>([]);

  const handleNotificationStyleChange = (style: string) => {
    setNotificationStyle(style);
  };

  const handleTargetAddressChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setTargetAddress(event.target.value);
  };

  const handleAddAddress = () => {
    if (targetAddress.trim() !== "") {
      if (ethers.utils.isAddress(targetAddress)) {
        setAddressList((prevList) => [...prevList, targetAddress]);
        setTargetAddress("");
      }
    }
  };

  const sendNotification = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const _signer = provider.getSigner();
    if (notificationStyle === "1") {
      try {
        const apiResponse = await PushAPI.payloads.sendNotification({
          signer: _signer,
          type: 1,
          identityType: 2,
          notification: {
            title: `${props.dappname}`,
            body: `${notification}`,
          },
          payload: {
            title: `${props.dappname}`,
            body: `${notification}`,
            cta: `{props.dappsite}`,
            img: "",
          },
          channel: `eip155:80001:${props.dappowneraddress}`,
          env: ENV.STAGING,
        });
      } catch (err) {
        console.error("Error: ", err);
      }
    }
    if (notificationStyle === "2") {
      try {
        await PushAPI.payloads.sendNotification({
          signer: _signer,
          type: 4,
          identityType: 2,
          notification: {
            title: `${props.dappname}`,
            body: `${notification}`,
          },
          payload: {
            title: `${props.dappname}`,
            body: `${notification}`,
            cta: `{props.dappsite}`,
            img: "",
          },
          recipients: addressList,
          channel: `eip155:80001:${props.dappowneraddress}`,
          env: ENV.STAGING,
        });
      } catch (err) {
        console.error("Error: ", err);
      }
    }
  };

  return (
    <div className="flex flex-row my-5">
      <div className="flex flex-col w-1/2">
        <p className="text-white text-[24px]">dApp Owner Dashboard</p>
        <p className="text-[#87868C] text-[20px]">Enter Notification :</p>
        <textarea
          className="w-full bg-gray-900 text-white"
          value={notification}
          onChange={(e) => setNotification(e.target.value)}
        ></textarea>
      </div>
      <div className="flex flex-col w-1/2 ml-7">
        <p className="text-white text-[20px]">Choose Notification style</p>
        <div className="flex flex-row mt-2">
          <label className="mr-4">
            <input
              type="radio"
              name="notificationStyle"
              value="style1"
              checked={notificationStyle === "style1"}
              onChange={() => handleNotificationStyleChange("1")}
              className="mr-1"
            />
            Broadcast
          </label>
          <label>
            <input
              type="radio"
              name="notificationStyle"
              value="style2"
              checked={notificationStyle === "style2"}
              onChange={() => handleNotificationStyleChange("2")}
              className="mr-1"
            />
            Targeted
          </label>
        </div>
        {notificationStyle === "1" ? (
          <div></div>
        ) : (
          <div>
            <input
              type="text"
              value={targetAddress}
              onChange={handleTargetAddressChange}
              placeholder="Enter address"
              className="w-full bg-gray-900 text-white mt-2 p-2"
            />
            <button
              className="bg-gradient-to-b from-[#8A46FF] to-[#6E38CC] rounded-full text-white text-[14px] px-4 py-2 mt-2"
              onClick={handleAddAddress}
            >
              Add Address
            </button>
          </div>
        )}
        <button onClick={()=>sendNotification()} className="bg-gradient-to-b from-[#8A46FF] to-[#6E38CC] rounded-full text-white text-[14px] px-4 py-2 mt-2">
          Send Notification
        </button>
      </div>
    </div>
  );
};
