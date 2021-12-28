import React from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { clearUser } from "../../../Redux/Slices/user.slice";
import { ProfileHeaderProps } from "../Profile.interface";
import { setIsLoggedIn } from "../../../Redux/Slices/isLoggedIn.slice";

import { useDarkMode } from "../../../Shared/Hooks/useDarkMode";

import NavigationIcon from "../../Navigation/NavigationIcon";
import Avatar from "../../Avatar";

import { logout } from "../../../Services/user";

import { icon } from "../../../Shared/icons";
import Wave from "../../../public/assets/images/wave.svg";
import { Paths } from "../../../Shared/paths.const";
import { setBadgeNotification } from "../../../Redux/Slices/badgeNotification.slice";

const { FiLogOut, RiMoonFill, RiSunFill } = icon;

export const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  firstName,
  lastName,
  avatar,
  testimonial,
  openModal,
}) => {
  const dispatch = useDispatch();
  const [enableDarkMode, setEnableDarkMode] = useDarkMode();
  const toggleDarkMode = () => setEnableDarkMode(!enableDarkMode);
  const router = useRouter();

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
              icon={enableDarkMode ? RiSunFill : RiMoonFill}
              size={16}
              containerClassName="px-1"
              iconClassName={`w-7 h-7 ${
                enableDarkMode ? "text-yellow-200" : "text-gray-200"
              }`}
            />
          </button>
          <button className="block cursor-pointer" onClick={logoutHandler}>
            <NavigationIcon
              icon={FiLogOut}
              size={16}
              containerClassName="px-1"
              iconClassName={`w-7 h-7`}
            />
          </button>
        </div>
        <div className="absolute -bottom-16 -left-1 right-0">
          <Wave
            width={"100%"}
            height={"100px"}
            className="text-whiteBackground"
            preserveAspectRatio="none"
          />
        </div>
      </div>
    </div>
  );
};
