import React from "react";
import Image from "next/image";

import { AvatarProps } from "./index.interface";

import { useTranslation } from "../../shared/hooks/useTranslation";

import { icon } from "../../shared/icons";
import { validation } from "../../shared/regExValidation";
import { IMAGE_PLACEHOLDER_BASE64 } from "../../shared/shared.const";

const { MdOutlineModeEditOutline, GiRank1 } = icon;

const Avatar: React.FC<AvatarProps> = ({
  avatar,
  firstName,
  containerClassName,
  editable = true,
  toggleAvatarModal,
}) => {
  const { translate } = useTranslation();

  const openAvatarUploadModal = () => {
    toggleAvatarModal({ display: true, uploadFunctionality: true });
  };

  const openAvatarPreview = () => {
    toggleAvatarModal({ display: true, uploadFunctionality: false });
  };

  const onClickRank = () =>
    alert("Soon we'll have ranking visit -> Avatar/index.tsx - |67");

  return (
    <div
      className={`relative w-36 min-w-36 h-36 min-h-36 border-2 border-darkPrimaryText border-dashed shadow-md rounded-full p-2.5 ${containerClassName}`}
    >
      <div className="w-full h-full rounded-full overflow-hidden">
        {validation.isHexColor.test(avatar) ? (
          <div
            className="w-full h-full flex justify-center items-center"
            style={{ backgroundColor: avatar }}
          >
            <p className="text-xxxl">{firstName[0].toUpperCase()}</p>
          </div>
        ) : (
          <button
            className="w-full h-full selection:bg-transparent"
            onClick={openAvatarPreview}
          >
            <Image
              loading="eager"
              placeholder="blur"
              blurDataURL={IMAGE_PLACEHOLDER_BASE64}
              className="rounded-full inline-block"
              src={avatar}
              width={"100%"}
              height={"100%"}
              layout="responsive"
              objectFit="cover"
              alt={translate.profilePicture}
            />
          </button>
        )}
      </div>
      {
        // The ranking system w'll be particularly for trainer or user
        // The trainer will reach a higher level when add paid event and sell 1v1 sessions
        // Thr user will reach a higher leven when participate at events, buy sessions, DM to trainers
        // EVERY PREMIUM USER WILL HAVE A DIFFERENT ICON COLOR (!)
        <button
          onClick={onClickRank}
          className={`absolute bg-gray-400 ${
            toggleAvatarModal && editable
              ? "-right-2 bottom-9"
              : "right-1 bottom-2"
          } shadow-md rounded-full p-1 transition-all hover:scale-105 text-black dark:text-darkPrimaryText`}
        >
          <GiRank1 size={18} />
        </button>
      }
      {toggleAvatarModal && editable && (
        <button
          onClick={openAvatarUploadModal}
          className="absolute backgroundColor right-1 bottom-2 shadow-md rounded-full p-1 transition-all hover:scale-105 text-black dark:text-white"
        >
          <MdOutlineModeEditOutline size={18} />
        </button>
      )}
    </div>
  );
};

export default Avatar;
