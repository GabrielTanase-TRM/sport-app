import React from "react";
import { icon } from "../../../shared/icons";
import { SportType } from "../../../shared/shared.enum";
import DefaultCard from "../../Cards/DefaultCard";
import { EducationLabelType } from "../../Cards/index.enum";
import SectionDivider from "../../SectionDivider";
import Warning from "../../Waning";
// import { useDispatch } from "react-redux";
// import { setBadgeNotification } from "../../../redux/slices/badgeNotification.slice";
import { ProfileBodyProps } from "../Profile.interface";
import { SectionType } from "../sections.enum";

const { IoSchoolSharp, MdWork } = icon;

const ProfileBody: React.FC<ProfileBodyProps> = ({ currentUser, isOwner }) => {
  // const dispatch = useDispatch();
  console.log(currentUser);
  // const setIt = () => {
  //   dispatch(
  //     setBadgeNotification({
  //       message:
  //         " Test test Test Test test Test test Testtest Testtest Testtest Test",
  //       isError: false,
  //       secondDuration: 3,
  //     })
  //   );
  // };
  return (
    <div className="py-2 bg-red-10">
      <div className="px-2 mb-2">
        <span>
          <h1 className=" text-2xl">
            {currentUser?.firstName} {currentUser?.lastName}
          </h1>
        </span>
        <p className="text-xxs text-disabled dark:text-darkDisabled">
          SOON: Premium users can add email, phone and social platforms in
          profile info. + premium badge ( ! )
        </p>
        <div className="text-sm">
          {/* currentUser.typeOfSports.map() */}

          {currentUser?.typeOfSports ? (
            <p>{SportType[currentUser?.sport]}</p>
          ) : (
            <div className="flex items-center">
              <p className="text-disabled dark:text-darkDisabled mr-2">
                Sport type
              </p>
              <Warning
                size={22}
                infoMessage="Please complete your sport specialization."
              />
            </div>
          )}
        </div>
      </div>
      <SectionDivider sectionName={SectionType.INTRODUCING} />
      <div className="p-2">
        <p className="text-xxs text-disabled dark:text-darkDisabled">
          SOON: Video description
        </p>
        <p>
          Lorem Ipsum is simply dummy text of the printing and typesetting
          industry. Lorem Ipsum has been the industry's standard dummy text ever
          since the 1500s, when an unknown printer took a galley of type and
          scrambled it to make a type specimen book
        </p>
      </div>
      <SectionDivider sectionName={SectionType.EDUCATION} />
      {/* currentUser.education.map() */}
      <DefaultCard
        icon={IoSchoolSharp}
        headline="UNEFS"
        description="Sport si performanta motrica"
        label={EducationLabelType.Academic}
      />
      <SectionDivider sectionName={SectionType.WORK} />
      {/* currentUser.work.map() 
        current work
        outdoor/indoor
        places ( gym, spaces, places, cities)
        disabilities person?
        train with kids?
      */}
      <DefaultCard
        icon={MdWork}
        headline="WorldClass"
        description="Personal trainer"
      />
      <div>
        <div>
          Training zone:
          <span className="ml-1">indoor/outdoor</span>
        </div>
        <div>
          Where we can do the training:
          <span className="ml-1">WorldClass Downtown</span>,
          <span className="ml-1">Downtown Fitness</span>
        </div>
        <div>
          Training kids:
          <span className="ml-1">Yes</span>
        </div>
      </div>
      <SectionDivider sectionName={SectionType.GALLERY} />
      <SectionDivider sectionName={SectionType.PLAN} />
      <SectionDivider sectionName={SectionType.EVENTS} />
      <div></div>
    </div>
  );
};

export default ProfileBody;
