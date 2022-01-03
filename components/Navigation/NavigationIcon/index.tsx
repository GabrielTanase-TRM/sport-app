import React, { useEffect, useState } from "react";
import Image from "next/image";
import { t } from "../../../Locales/locales.utils";
import { NaviIconProps } from "../Navigation.interface";
import { validation } from "../../../shared/regExValidation";
import { IMAGE_PLACEHOLDER_BASE64 } from "../../../shared/shared.const";

const NavigationIcon: React.FC<NaviIconProps> = ({
  icon,
  size,
  iconClassName = "",
  containerClassName = "",
  tooltip,
  active,
  firstName,
}) => {
  const [isActive, setIsActive] = useState(false);
  const Icon = icon;

  useEffect(() => {
    if (active) {
      if (active.includes(tooltip.toLowerCase())) {
        setIsActive(true);
      } else if (active == "/" && tooltip == "Home") {
        setIsActive(true);
      }
    }
  }, [active]);

  return (
    <div
      className={`border-r-2 ${containerClassName} ${
        isActive
          ? "border-turquoise"
          : "border-lightBackground dark:border-darkBackground"
      } px-3`}
    >
      <div
        className={`${iconClassName} navi-icon lg:group ${
          isActive && "bg-gray-800 text-turquoise"
        }`}
      >
        {validation.isHexColor.test(icon as string) ? (
          <div
            className="w-full h-full flex justify-center items-center rounded-inherit"
            style={{ backgroundColor: icon as string }}
          >
            <p className="text-xl">{firstName[0].toUpperCase()}</p>
          </div>
        ) : typeof icon === "string" ? (
          <div className="w-full">
            <div className="w-8 h-8 mx-auto rounded-full">
              <Image
                loading="eager"
                placeholder="blur"
                blurDataURL={IMAGE_PLACEHOLDER_BASE64}
                className="rounded-full"
                width={"100%"}
                height={"100%"}
                src={icon}
                layout="responsive"
                objectFit="cover"
                alt={t("profilePicture")}
              />
            </div>
          </div>
        ) : (
          <Icon size={size} />
        )}
        {tooltip && (
          <span className="tooltip lg:group-hover:scale-100">{tooltip}</span>
        )}
      </div>
    </div>
  );
};

export default NavigationIcon;
