import React from "react";
import { FileInputButtonProps } from "./FileInputButton.interface";

export const FileInputButton: React.FC<FileInputButtonProps> = ({
  acceptedFileTypes = "",
  allowMultipleFiles = false,
  label,
  onChange,
  uploadFileName,
}) => {
  const fileInputRef = React.useRef<HTMLInputElement | null>(null);
  const formRef = React.useRef<HTMLFormElement | null>(null);

  const onClickHandler = () => {
    fileInputRef.current?.click();
  };

  const onChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (!event.target.files?.length) {
      return;
    }

    onChange(event.target.files);

    formRef.current?.reset();
  };

  return (
    <form ref={formRef}>
      <label className="absolute bottom-0 left-0 bg-turquoise text-white p-2 rounded-md cursor-pointer hover:scale-105 transition-all text-xs">
        <button type="button" onClick={onClickHandler}>
          {label}
        </button>
        <input
          accept={acceptedFileTypes}
          multiple={allowMultipleFiles}
          name={uploadFileName}
          onChange={onChangeHandler}
          ref={fileInputRef}
          style={{ display: "none" }}
          type="file"
        />
      </label>
    </form>
  );
};
