import React, { useEffect, useRef, useState } from "react";
import { WidthButton } from "./SwitchButton.enum";
import { SwitchButtonProps } from "./SwitchButton.interface";

const SwitchButton: React.FC<SwitchButtonProps> = ({
  value,
  onChange,
  widthButton = WidthButton.xl,
  leftContent = "Left",
  rightContent = "Right",
}) => {
  const [leftButtonWidth, setLeftButtonWidth] = useState(0);
  const [rightButtonWidth, setRightButtonWidth] = useState(0);
  const leftButtonRef = useRef(null);
  const rightButtonRef = useRef(null);

  const marginSelector = `${widthButton * 0.05}px`;

  useEffect(() => {
    setLeftButtonWidth(leftButtonRef.current.clientWidth);
    setRightButtonWidth(rightButtonRef.current.clientWidth);
  }, [leftButtonRef, rightButtonRef]);

  return (
    <div className={`flex justify-center w-full`}>
      <div
        style={{
          boxShadow: "0px 0px 10px 0px rgb(126 189 194 / 50%)",
          width: `${widthButton}px`,
          margin: `${widthButton * 0.1}px 0`,
          height: `${widthButton / 4}px`,
        }}
        className={`rounded-3xl relative bg-turquoise`}
      >
        <div
          className={`z-1 absolute rounded-3xl bg-white`}
          style={{
            transition: value
              ? "left 0.4s 0.2s, right 0.5s, color 0.35s -0.1s"
              : "left 0.5s, right 0.4s 0.2s",
            top: marginSelector,
            bottom: marginSelector,
            left: value ? `${leftButtonWidth + 21}px` : marginSelector,
            right: value ? marginSelector : `${rightButtonWidth + 20}px`,
          }}
        />
        <div
          style={{
            padding: `0 ${widthButton * 0.1}px`,
          }}
          className="absolute top-0 z-10 flex justify-between items-center font-extrabold w-full h-full"
        >
          <a
            ref={leftButtonRef}
            style={{ fontSize: widthButton / 10, width: widthButton * 0.45 }}
            className={`px-1 pr-[7px] cursor-pointer text-center select-none ${
              value ? "text-gray-500" : "text-black"
            }`}
            onClick={() => onChange(false)}
          >
            {leftContent}
          </a>
          <a
            ref={rightButtonRef}
            style={{ fontSize: widthButton / 10, width: widthButton * 0.45 }}
            className={`px-1 pl-[7px] cursor-pointer text-center select-none ${
              value ? "text-black" : "text-gray-500"
            }`}
            onClick={() => onChange(true)}
          >
            {rightContent}
          </a>
        </div>
      </div>
    </div>
  );
};

export default SwitchButton;
