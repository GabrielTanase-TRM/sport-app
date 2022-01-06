import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";

import { getIsLoggedIn, getUser } from "../../../redux/selectors";

import { icon } from "../../../shared/icons";
import { Paths } from "../../../shared/paths.const";
import { BRANDING_NAME } from "../../../shared/shared.const";

import NavigationIcon from "../NavigationIcon";
import { NavigationIconWrapper } from "../NavigationIconWrapper";
import HamburgerButton from "../../HamburgerButton";
import Overlay from "../../Overlay";

import { images } from "../../../shared/images";
import { NavigationProps } from "./index.inerface";
import useCookie from "../../../shared/hooks/useCookie";

const { BrandingLogo } = images;

const {
  BsSuitHeartFill,
  MdOutlineSportsHandball,
  FaBookReader,
  GoMail,
  FiLogIn,
  MdLiveHelp,
  MdHome,
  BsArrowDownCircle,
} = icon;

export const Navigation: React.FC<NavigationProps> = ({ deferredPrompt }) => {
  const [active, setActive] = useState("");
  const [isHamburgerOpen, setIsHamburgerOpen] = useState(false);
  const [cookie] = useCookie("sport-app-installed", false);

  const router = useRouter();
  const user = useSelector(getUser);
  const isLoggedIn = useSelector(getIsLoggedIn);

  const { avatar, firstName } = user;

  useEffect(() => {
    setActive(router.route);
  }, [router]);

  const iconSize = "55%";
  const iconProps = {
    size: iconSize,
    active: active,
  };

  const toggleHamburger = () => setIsHamburgerOpen(!isHamburgerOpen);

  const handleInstallPrompt = async () => {
    // Show the install prompt
    deferredPrompt.prompt();
  };

  return (
    <>
      {isHamburgerOpen && <Overlay onClick={toggleHamburger} />}
      <div
        className={`fixed lg:relative lg:flex lg:max-w-[60px] bg-lightBackground dark:bg-darkSecondaryBackground transition-translate duration-500 ease-out -translate-x-full lg:translate-x-0 z-50 h-full pb-10 lg:py-10 flex flex-col items-center justify-between shadow-xl border-r border-divider dark:border-gray-800 ${
          isHamburgerOpen && "translate-x-0"
        }`}
      >
        <HamburgerButton
          isActive={isHamburgerOpen}
          setIsActive={toggleHamburger}
        />
        <div className="z-10 bg-lightBackground dark:bg-darkSecondaryBackground">
          <div className="lg:px-1 lg:block flex justify-center">
            <Image
              src={BrandingLogo}
              width={"100%"}
              height={"80%"}
              objectFit="contain"
              alt={`${BRANDING_NAME} Logo`}
            />
          </div>
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
          {!cookie && (
            <button onClick={handleInstallPrompt}>
              <NavigationIcon
                {...iconProps}
                icon={BsArrowDownCircle}
                tooltip={Paths.Install.name}
              />
            </button>
          )}
        </div>
      </div>
    </>
  );
};
