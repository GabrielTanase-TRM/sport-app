import React, { useState } from "react";
import Image from "next/image";
import { isNil } from "lodash";
import { useDispatch } from "react-redux";
import { setBadgeNotification } from "../../Redux/Slices/badgeNotification.slice";

import { t } from "../../Locales/locales.utils";

import { ModalProps } from "./Modal.Interface";

import { FileInputButton } from "../FileInputButton";
import { ProgressCircle } from "../ProgressCircle";
import Button from "../Button";

import { icon } from "../../Shared/icons";
import { BadgeNotificationDuration } from "../../Shared/shared.enum";

import { validation } from "../../Shared/regExValidation";
import useUploadAvatar from "../../Shared/Hooks/useUploadAvatar";
import { updateAvatar } from "../../Services/user";
import { setUser } from "../../Redux/Slices/user.slice";

const { IoClose } = icon;

export const Modal: React.FC<ModalProps> = ({
  id,
  closeModal,
  firstName,
  avatar,
}) => {
  const [avatarPreview, setAvatarPreview] = useState<string>(avatar);
  const [uploadedImage, setUploadedImage] = useState<any>(null);
  const dispatch = useDispatch();
  const { startUploadAvatar, uploadProgress } = useUploadAvatar();

  const avatarUploadError = {
    message: t("avatarSuccessfullyUploaded"),
    secondDuration: BadgeNotificationDuration.LONGER,
  };

  const onChange = async (uploadedImages: any[]) => {
    setUploadedImage(uploadedImages[0]);
    setAvatarPreview(URL.createObjectURL(uploadedImages[0]));
  };

  const onSave = async () => {
    const avatarURL = await startUploadAvatar(id, uploadedImage);
    if (!isNil(avatarURL)) {
      updateAvatar({ avatarURL: avatarURL as string }).then((res) => {
        if (res.status == 200) {
          closeModal();
          dispatch(setBadgeNotification(avatarUploadError));
          dispatch(setUser(res.data.user));
        }
      });
    }
  };

  return (
    <div
      className="
    absolute inset-0 w-full h-full flex justify-center items-center"
    >
      <div
        onClick={closeModal}
        className="absolute inset-0 bg-overlay w-full h-full"
      />
      <div className="relative z-10 w-10/12 h-2/6 max-w-xs bg-white rounded-lg shadow-xl flex flex-col justify-between items-center p-4">
        <button onClick={closeModal} className="absolute right-2 top-2">
          <IoClose size={20} className="text-gray-300 hover:text-turquoise" />
        </button>
        <div className="w-full h-2/3 flex items-center justify-center">
          <div className="w-32 h-32">
            {validation.isHexColor.test(avatarPreview) ||
            avatarPreview === "" ? (
              <div
                className="w-full h-full flex justify-center items-center rounded-full"
                style={{ backgroundColor: avatarPreview }}
              >
                <p className="text-xxxl">{firstName[0].toUpperCase()}</p>
              </div>
            ) : (
              <Image
                className="object-cover rounded-full"
                src={avatarPreview}
                width={"100%"}
                height={"100%"}
                layout="responsive"
                objectFit="cover"
                alt={t("profilePicture")}
              />
            )}
          </div>
        </div>
        <div className="w-full h-1/3">
          <div className="w-full h-1/2 flex justify-end">
            {uploadProgress !== 0 && (
              <ProgressCircle
                dimension={40}
                strokeWidth={4}
                value={uploadProgress}
                numberSize={12}
                percentSize={10}
              />
            )}
          </div>
          <div className="flex w-full h-1/2">
            <div className="relative h-full w-2/3">
              <FileInputButton
                label={t("chooseAvatar")}
                acceptedFileTypes="image/png, image/jpeg, image/jpg"
                onChange={onChange}
                uploadFileName="avatar"
              />
            </div>
            <div className="w-1/3 flex justify-end items-end">
              <Button
                disabled={isNil(uploadedImage)}
                label={t("save")}
                onClick={onSave}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
