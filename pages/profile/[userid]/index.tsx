import React, { useState } from "react";
import { GetServerSidePropsContext } from "next";
import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../../Redux/selectors";

import { PagePropsType, User } from "../../../Shared/shared.interface";

import { ProfileHeader } from "../../../Components/Profile";
import { Modal } from "../../../Components/Modal/AvatarUpload";
import { setBadgeNotification } from "../../../Redux/Slices/badgeNotification.slice";

export interface UserProfileProps extends PagePropsType {
  currentUser: User;
}

const UserProfile: React.FC<UserProfileProps> = (props) => {
  const user = useSelector(getUser);
  const dispatch = useDispatch();
  const isOwner = user.id === props.currentUser.id;
  const currentUser = isOwner ? user : props.currentUser;
  const [showModal, setShowModal] = useState(false);

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const setIt = () => {
    dispatch(
      setBadgeNotification({
        message: " Test test Test Test test Test",
        isError: false,
        secondDuration: 999,
      })
    );
  };

  return (
    <div className="w-full h-screen relative ">
      <ProfileHeader
        firstName={currentUser.firstName}
        lastName={currentUser.lastName}
        avatar={currentUser.avatar}
        testimonial={currentUser.testimonials}
        openModal={openModal}
      />
      <button onClick={() => setIt()}>stit</button>
      <div>
        <div>Name: {currentUser?.firstName}</div>
        <div>Surname: {currentUser?.lastName}</div>
        <div>Trainer?: {currentUser?.isTrainer?.toString()}</div>
        <div>isOwner?: {isOwner.toString()}</div>
      </div>
      {showModal && (
        <Modal
          closeModal={closeModal}
          id={currentUser.id}
          firstName={currentUser.firstName}
          lastName={currentUser.lastName}
          avatar={currentUser.avatar}
        />
      )}
    </div>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const cookie = context.req?.headers.cookie;

  const request = await fetch(
    `http://localhost:3000/api/user/${context.query.userid}`,
    {
      headers: {
        cookie: cookie!,
      },
    }
  );
  if (request.status === 401 && !context.req) {
    // Unauthenticated on client side, manipulate router
    return {
      user: null,
    };
  }

  if (request.status === 401 && context.req) {
    // Unauthenticated on server side, manipulate context res
    context.res.writeHead(302, {
      Location: "http://localhost:3000/login",
    });
    return {
      user: null,
    };
  }

  const response = await request.json();
  return {
    props: {
      currentUser: response,
    },
  };
};

export default UserProfile;
