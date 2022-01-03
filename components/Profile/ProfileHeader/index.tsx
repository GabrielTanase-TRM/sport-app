import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { clearUser } from "../../../Redux/slices/user.slice";
import { ProfileHeaderProps } from "../Profile.interface";
import { setIsLoggedIn } from "../../../Redux/slices/isLoggedIn.slice";

import { useTheme } from "next-themes";
import NavigationIcon from "../../Navigation/NavigationIcon";
import Avatar from "../../Avatar";

import { logout } from "../../../services/user";

import { icon } from "../../../shared/icons";
import Wave from "../../../public/assets/images/wave.svg";
import { Paths } from "../../../shared/paths.const";
import { setBadgeNotification } from "../../../pages/redux/slices/badgeNotification.slice";

const { FiLogOut, RiMoonFill, RiSunFill } = icon;

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  firstName,
  lastName,
  avatar,
  testimonial,
  openModal,
}) => {
  const dispatch = useDispatch();
  const router = useRouter();

  // const [isMounted, setIsMounted] = useState(false);
  const [isDarkTheme, setIsDarkTheme] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setIsDarkTheme(theme === "light" ? false : true);
  }, [theme]);

  const toggleDarkMode = () => {
    setTheme(isDarkTheme ? "light" : "dark");
  };
  const logoutHandler = () =>
    logout().then((res) => {
      if (res.status === 200) {
        router.replace(Paths.Homepage.path);
        dispatch(setIsLoggedIn(false));
        dispatch(clearUser());
        dispatch(
          setBadgeNotification({
            message: "Test test Test",
            isError: true,
            secondDuration: 3,
          })
        );
      }
    });
  return (
    <div className="w-full overflow-hidden">
      <div className="relative min-h-240px h-1/5 w-full bg-gradient-to-b from-white to-turquoise flex items-center px-4">
        <Avatar avatar={avatar} openModal={openModal} firstName={firstName} />
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
          <button className="block cursor-pointer" onClick={logoutHandler}>
            <NavigationIcon
              icon={FiLogOut}
              size={16}
              containerClassName="px-1 border-none"
              iconClassName={`w-7 h-7 mr-0`}
            />
          </button>
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
  );
};
