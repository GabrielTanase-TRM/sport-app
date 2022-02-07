import React, { useEffect, useState } from "react";
import { WarningProps } from "./index.interface";
import { icon } from "../../shared/icons";

const { TiWarning } = icon;

const Warning: React.FC<WarningProps> = ({
  size = 20,
  infoMessage,
  durationMessage = 3,
}) => {
  const [showInfoMessage, setShowInfoMessage] = useState<boolean>(false);

  const onClickWarning = () => setShowInfoMessage(true);

  useEffect(() => {
    let countDown;
    if (showInfoMessage) {
      countDown = setTimeout(
        () => (setShowInfoMessage(false), console.log("in in")),
        durationMessage * 1000
      );
    }
    return () => {
      clearTimeout(countDown);
    };
  }, [showInfoMessage]);

  return (
    <div className="relative">
      <button onClick={onClickWarning} className="group text-yellowWarning">
        <TiWarning size={size} />
        {infoMessage && (
          <span
            className={`${
              showInfoMessage && "scale-100 lg:scale-0"
            } absolute z-10 w-auto p-2 m-2 min-w-max -top-8 left-5 rounded-md
            shadow-md text-white bg-gray-800 text-xs font-bold transition-all duration-200 
            scale-0 origin-left group-hover:scale-100`}
          >
            {infoMessage}
          </span>
        )}
      </button>
    </div>
  );
};

export default Warning;
