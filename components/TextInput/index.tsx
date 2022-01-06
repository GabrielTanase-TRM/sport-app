import React from "react";
import { isEmpty } from "lodash";
import { TextInputProps } from "./TextInput.interface";
import Warning from "../../public/assets/icons/warning.svg";

export const TextInput: React.FC<TextInputProps> = ({
  onChange,
  value,
  label,
  inputId,
  type,
  rightIcon,
  leftIcon,
  hasError,
  errorMessage,
  required,
  placeHolder,
  inputClassName,
}) => {
  const paddingByIconsNumber = () => {
    switch (true) {
      case hasError && !isEmpty(rightIcon):
        return "pr-20";
      case hasError || !isEmpty(rightIcon):
        return "pr-12";
      default:
        return "";
    }
  };

  return (
    <div className="max-w-440px w-full">
      <div className="relative pb-4  ">
        <p className={`ml-2`}>{label}</p>
        <div className="relative overflow-hidden">
          {leftIcon && (
            <div
              className={`absolute left-0 top-0 h-42px w-42px p-2 flex items-center border-2 border-r-0 bg-turquoise rounded-l-md
            ${hasError ? "border-redError" : "border-turquoise"}`}
            >
              {leftIcon}
            </div>
          )}
          <input
            className={`w-full outline-none px-2 py-2.5 text-base leading-4 rounded-md border-2 min-w-250px ${
              hasError
                ? "border-redError focus:border-redError"
                : "border-gray-300 bg-gray-300 dark:border-darkSecondaryBackground dark:bg-darkSecondaryBackground  focus:border-turquoise"
            } 
            ${paddingByIconsNumber()}
            
            ${leftIcon && "pl-12"}
            ${inputClassName}`}
            id={inputId}
            type={type}
            placeholder={placeHolder}
            onChange={onChange}
            value={value}
            required={required}
          />
          {hasError && (
            <div
              className={`absolute top-0 h-11 w-11 p-2 flex items-center ${
                !rightIcon ? "right-0" : "right-9"
              }`}
            >
              <Warning
                width={"100%"}
                height={"100%"}
                preserveAspectRatio="none"
              />
            </div>
          )}
          {rightIcon && (
            <div className="absolute right-0 top-0 h-11 w-11 p-2 flex items-center ">
              {rightIcon}
            </div>
          )}
        </div>
        {hasError && (
          <div className="absolute left-1 bottom-0 w-full text-redError text-xxs">
            {errorMessage}
          </div>
        )}
      </div>
    </div>
  );
};
