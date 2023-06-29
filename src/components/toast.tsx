import React, { useState, useEffect } from "react";
import axios from "axios";
const Toast = ({ address }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [latestNotification, setLatestNotification] = useState("");

  const handleClose = () => {
    setIsOpen(false);
  };
  const GetLatestNotificationFromDappStore = async () => {
    try {
      const payload = {
        user: address,
        page: 1,
        pageSize: 50,
        op: "read",
      };

      const response = await axios.post(
        "https://backend-staging.epns.io/apis/feeds/get_feeds",
        payload
      );

      const { results } = response.data;

      const entry = results.find(
        (result) =>
          result.sender.toLowerCase() ===
          process.env.NEXT_PUBLIC_PUSH_CHANNEL_ADDRESS!.toLowerCase()
      );

      return entry.payload.notification.body || null;
    } catch (error) {
      console.error("Error occurred while fetching API data:", error);
      return null;
    }
  };
  useEffect(() => {
    const fetchLatestNotification = async () => {
      const response = await GetLatestNotificationFromDappStore();

      setLatestNotification(response);
    };

    fetchLatestNotification();
  }, [address]);

  return (
    <>
      {isOpen && latestNotification?.length > 0 && (
        <div className="top-4 bg-green-500 bg-opacity-75 text-white px-4 py-2 rounded-xl shadow mx-2">
          <div className="flex justify-between items-center">
            <span className="text-white">{latestNotification}</span>
            <button
              className="text-white hover:text-gray-300"
              onClick={handleClose}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4 ml-4"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M10 1a9 9 0 100 18A9 9 0 0010 1zM5.707 6.293a1 1 0 010 1.414L8.414 10l-2.707 2.293a1 1 0 101.414 1.414L10 11.414l2.293 2.707a1 1 0 001.414-1.414L11.414 10l2.707-2.293a1 1 0 10-1.414-1.414L10 8.586 7.707 6.293a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Toast;
