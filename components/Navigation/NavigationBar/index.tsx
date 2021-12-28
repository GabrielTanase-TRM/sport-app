import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getIsLoggedIn, getUser } from "../../../Redux/selectors";

import { icon } from "../../../Shared/icons";
import { Paths } from "../../../Shared/paths.const";

import NavigationIcon from "../NavigationIcon";
import { NavigationIconWrapper } from "../NavigationIconWrapper";

const {
  BsSuitHeartFill,
  MdOutlineSportsHandball,
  FaBookReader,
  GoMail,
  FiLogIn,
  MdLiveHelp,
  MdHome,
} = icon;

export const Navigation = () => {
  const [active, setActive] = useState("");

  const router = useRouter();

  const user = useSelector(getUser);
  const isLoggedIn = useSelector(getIsLoggedIn);

  const { avatar, firstName } = user;

  useEffect(() => {
    setActive(router.route);
  }, [router]);

  const iconSize = 18;
  const iconProps = {
    size: iconSize,
    active: active,
  };

  return (
    <div className="h-full py-10 flex flex-col items-center justify-between shadow-xl border-r border-divider dark:bg-red-400">
      <div>
        <div className="mb-8">LOGO</div>
        <Link href={Paths.Homepage.path} passHref>
          <NavigationIconWrapper>
            <NavigationIcon
              {...iconProps}
              icon={MdHome}
              tooltip={Paths.Homepage.name}
            />
          </NavigationIconWrapper>
        </Link>
        <Link href={Paths.Members.path} passHref>
          <NavigationIconWrapper>
            <NavigationIcon
              {...iconProps}
              icon={MdOutlineSportsHandball}
              tooltip={Paths.Members.name}
            />
          </NavigationIconWrapper>
        </Link>
        <Link href={Paths.Trainers.path} passHref>
          <NavigationIconWrapper>
            <NavigationIcon
              {...iconProps}
              icon={BsSuitHeartFill}
              tooltip={Paths.Trainers.name}
            />
          </NavigationIconWrapper>
        </Link>
        <Link href={Paths.About.path} passHref>
          <NavigationIconWrapper>
            <NavigationIcon
              {...iconProps}
              icon={FaBookReader}
              tooltip={Paths.About.name}
            />
          </NavigationIconWrapper>
        </Link>
        <Link href={Paths.Contact.path} passHref>
          <NavigationIconWrapper>
            <NavigationIcon
              {...iconProps}
              icon={GoMail}
              tooltip={Paths.Contact.name}
            />
          </NavigationIconWrapper>
        </Link>
        <Link href={Paths.Help.path} passHref>
          <NavigationIconWrapper>
            <NavigationIcon
              {...iconProps}
              icon={MdLiveHelp}
              tooltip={Paths.Help.name}
            />
          </NavigationIconWrapper>
        </Link>
      </div>
      <div>
        {isLoggedIn ? (
          <Link href={`${Paths.Profile.path}/${user.id}`} passHref>
            <NavigationIconWrapper>
              <NavigationIcon
                {...iconProps}
                icon={avatar}
                firstName={firstName}
                tooltip={Paths.Profile.name}
              />
            </NavigationIconWrapper>
          </Link>
        ) : (
          <Link href={Paths.Authentication.path} passHref>
            <NavigationIconWrapper>
              <NavigationIcon
                {...iconProps}
                icon={FiLogIn}
                tooltip={Paths.Authentication.name}
              />
            </NavigationIconWrapper>
          </Link>
        )}
      </div>
    </div>
  );
};
