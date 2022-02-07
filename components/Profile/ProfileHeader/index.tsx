import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useTheme } from "next-themes";

import { useDispatch } from "react-redux";
import { clearUser } from "../../../redux/slices/user.slice";
import { setIsLoggedIn } from "../../../redux/slices/isLoggedIn.slice";
import { setBadgeNotification } from "../../../redux/slices/badgeNotification.slice";

import { useTranslation } from "../../../shared/hooks/useTranslation";

import { logout } from "../../../services/auth";

import {
  ProfileHeaderProps,
  ConfigAvatarModalType,
} from "../Profile.interface";

import NavigationIcon from "../../Navigation/NavigationIcon";
import Avatar from "../../Avatar";
import { AvatarModal } from "../../Modal/Avatar";

import { icon } from "../../../shared/icons";
import { svg } from "../../../shared/images";
import { Paths } from "../../../shared/paths.const";
import Button from "../../Button";

const { FiLogOut, RiMoonFill, RiSunFill } = icon;
const { Wave } = svg;

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  currentUser,
  isOwner,
}) => {
  const { firstName, avatar, testimonials } = currentUser;
  const dispatch = useDispatch();
  const router = useRouter();
  const [showAvatarModal, setShowAvatarModal] = useState(false);
  const [enableUploadFunctionality, setEnableUploadFunctionality] =
    useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { theme, setTheme } = useTheme();
  const { translate } = useTranslation();

  useEffect(() => {
    setIsDarkTheme(theme === "light" ? false : true);
  }, [theme]);

  const toggleDarkMode = () => {
    setTheme(isDarkTheme ? "light" : "dark");
  };

  const toggleAvatarModal = (config: ConfigAvatarModalType) => {
    setShowAvatarModal(config.display);
    setEnableUploadFunctionality(config.uploadFunctionality);
  };

  const closeModal = () => setShowAvatarModal(false);

  const logoutHandler = () =>
    logout().then((res) => {
      if (res.status === 200) {
        router.replace(Paths.Homepage.path);
        dispatch(setIsLoggedIn(false));
        dispatch(clearUser());
        dispatch(
          setBadgeNotification({
            message: translate.logoutSuccessfullyMessage,
            secondDuration: 3,
          })
        );
      }
    });

  const onClickContact = () =>
    alert("Soon contact with DM -> ProfileHeader/index/tsx - |64");

  return (
    <>
      <div className="w-full overflow-hidden">
        <div className="relative min-h-240px h-1/5 w-full bg-gradient-to-b from-white to-turquoise flex items-center px-4">
          <div className="w-1/2 sm:w-2/5 md:w-1/3">
            <Avatar
              avatar={avatar}
              toggleAvatarModal={toggleAvatarModal}
              firstName={firstName}
              editable={isOwner}
            />
          </div>
          <div className="absolute left-40 h-24 flex items-center pl-5">
            <p className="font-germania font-semibold text-helperText">
              {testimonials}
            </p>
          </div>
          {!isOwner && (
            <div className="absolute right-3 bottom-9">
              <Button
                customButtonClass="tracking-wider"
                label={translate.contactButton}
                onClick={onClickContact}
              />
            </div>
          )}
          <div className="absolute right-4 top-2 flex">
            <button className="block w-full" onClick={toggleDarkMode}>
              <NavigationIcon
                icon={isDarkTheme ? RiSunFill : RiMoonFill}
                size={16}
                containerClassName="px-1 border-none"
                iconClassName={`w-7 h-7 mr-0 ${
                  isDarkTheme ? "dark:text-yellow-200" : "text-gray-300"
                }`}
              />
            </button>
            {isOwner && (
              <button className="block cursor-pointer" onClick={logoutHandler}>
                <NavigationIcon
                  icon={FiLogOut}
                  size={16}
                  containerClassName="px-1 border-none"
                  iconClassName={`w-7 h-7 mr-0`}
                />
              </button>
            )}
          </div>
          <div className="absolute -bottom-16 -left-1 right-0">
            <Wave
              width={"100%"}
              height={"100px"}
              className="text-lightBackground dark:text-darkBackground"
              preserveAspectRatio="none"
            />
          </div>
        </div>
      </div>
      {showAvatarModal && (
        <AvatarModal
          closeModal={closeModal}
          id={currentUser.id}
          firstName={currentUser.firstName}
          lastName={currentUser.lastName}
          avatar={currentUser.avatar}
          enableUploadFunctionality={enableUploadFunctionality}
        />
      )}
    </>
  );
};
