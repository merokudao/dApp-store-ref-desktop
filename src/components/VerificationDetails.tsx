import React from "react";
import moment from "moment";

export type verifiedType = {
  resultURL: string;
  icon: string;
  description: string;
  type: string;
  vendorName: string;
  verifiedOn: string;
  verificationExpires: string;
};

export type VerificationDetailsProps = {
  verification: {
    icon: string;
    verified: verifiedType[];
  };
};

const VerificationDetails = ({ verification }: VerificationDetailsProps) => {
  return (
    <div id="verification-section">
      {verification?.verified &&
        verification?.verified.map((item, index) => (
          <>
            <div>
              <label>
                Verified By <strong>{item.vendorName}</strong>
              </label>{" "}
              <p>{item?.description}</p>
              <a
                className="text-blue-500"
                target="_blank"
                href={item?.resultURL}
              >
                View Report
              </a>
            </div>
            <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-y-4 gap-x-5 mt-6 md:mt-0 w-full justify-between">
              <div className="mt-5">
                <label>
                  Verified On {moment(item?.verifiedOn).format("DD/MM/YYYY")}
                </label>{" "}
              </div>
              <div className="mt-5">
                <label>
                  Expires On{" "}
                  {moment(item?.verificationExpires).format("DD/MM/YYYY")}
                </label>{" "}
              </div>
            </div>
            {index !== verification?.verified.length - 1 && (
              <hr className="m-2 my-5" />
            )}
          </>
        ))}
    </div>
  );
};

export default VerificationDetails;
