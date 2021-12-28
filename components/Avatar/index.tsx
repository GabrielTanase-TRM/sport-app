import React from "react";
import Image from "next/image";

import { t } from "../../Locales/locales.utils";
import { icon } from "../../Shared/icons";
import { validation } from "../../Shared/regExValidation";
import { IMAGE_PLACEHOLDER_BASE64 } from "../../Shared/shared.const";

interface AvatarProps {
  avatar: string;
  firstName: string;
  openModal?: (...args: any[]) => void;
  containerClassName?: string;
}
const { MdOutlineModeEditOutline } = icon;

const Avatar: React.FC<AvatarProps> = ({
  avatar,
  firstName,
  openModal,
  containerClassName,
}) => {
  return (
    <div
      className={`relative w-36 h-36 border-2 border-white border-dashed shadow-md rounded-full p-2.5 ${containerClassName}`}
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
            alt={t("profilePicture")}
          />
        )}
      </div>
      {openModal && (
        <button
          onClick={openModal}
          className="absolute bg-white right-1 bottom-2 shadow-md rounded-full p-1 transition-all hover:scale-105"
        >
          <MdOutlineModeEditOutline size={18} color="black" />
        </button>
      )}
    </div>
  );
};

export default Avatar;
