import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { removeBadgeNotification } from "../../redux/slices/badgeNotification.slice";
import { icon } from "../../shared/icons";

const { IoClose } = icon;

interface NotificationBadgeProps {
  errorId: number;
  isError?: boolean;
  message: string;
  secondDuration?: number;
}

export const NotificationBadge: React.FC<NotificationBadgeProps> = ({
  errorId,
  isError = false,
  message,
  secondDuration = 6,
}) => {
  const dispatch = useDispatch();
  const onClose = () => dispatch(removeBadgeNotification(errorId));

  useEffect(() => {
    const closeTimeout = setTimeout(onClose, secondDuration * 1000);
    return () => {
      clearTimeout(closeTimeout);
    };
  }, []);

  return (
    <div
      className={`flex items-center rounded-md mb-3 pl-3 w-fit bg-opacity-90 shadow-lg ${
        isError ? "bg-redError" : "bg-greenSuccess"
      }`}
    >
      <p className={`${isError ? "text-white" : "text-black"} text-xs py-1`}>
        {message}
      </p>
      <a onClick={onClose} className="flex justify-center items-center p-2">
        <IoClose
          size={18}
          className={`border rounded-full ${
            isError ? "text-white" : "text-black border-black"
          } shadow-md `}
        />
      </a>
    </div>
  );
};
