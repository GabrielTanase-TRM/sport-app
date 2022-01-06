import React from "react";
import Warning from "../../Waning";
// import { useDispatch } from "react-redux";
// import { setBadgeNotification } from "../../../redux/slices/badgeNotification.slice";
import { ProfileBodyProps } from "../Profile.interface";

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
      <div>
        <span>
          <h1 className=" text-2xl">
            {currentUser?.firstName} {currentUser?.lastName}
          </h1>
        </span>
        <div>
          {currentUser?.sport ? (
            currentUser?.sport
          ) : (
            <div className="flex items-center">
              <p className="text-disabled dark:text-darkDisabled">
                Sport type (*daca este cu gri si semnul de warning este prezent
                insemana ca nu este setat)
              </p>
              <Warning size={22} infoMessage="boule" />
            </div>
          )}
        </div>
        {/* <div>Surname: {currentUser?.lastName}</div>
        <div>Trainer?: {currentUser?.isTrainer?.toString()}</div>
        <div>isOwner?: {isOwner.toString()}</div> */}
      </div>
    </div>
  );
};

export default ProfileBody;
