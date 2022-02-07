import React from "react";
import { GetServerSidePropsContext } from "next";
import Router from "next/router";
import { useSelector } from "react-redux";
import { getUser } from "../../../redux/selectors";

import { PagePropsType, User } from "../../../shared/shared.interface";

import { ProfileHeader } from "../../../components/Profile/ProfileHeader";

import { BASE_URL } from "../../../services/service.const";
import { Paths } from "../../../shared/paths.const";
import ProfileBody from "../../../components/Profile/ProfileBody";

export interface UserProfileProps extends PagePropsType {
  currentUser: User;
}

const UserProfile: React.FC<UserProfileProps> = (props) => {
  const user = useSelector(getUser);

  const isOwner = user.id === props.currentUser.id;
  const currentUser = isOwner ? user : props.currentUser;

  return (
    <div className="w-full h-screen relative">
      <ProfileHeader currentUser={currentUser} isOwner={isOwner} />
      <ProfileBody currentUser={currentUser} isOwner={isOwner} />
    </div>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const cookie = context.req?.headers.cookie;

  const request = await fetch(`${BASE_URL}api/user/${context.query.userid}`, {
    headers: {
      cookie: cookie!,
    },
  });
  if (request.status === 401 && !context.req) {
    // Unauthenticated on client side, manipulate router
    Router.replace(Paths.Authentication.path);
    return {};
  }

  if (request.status === 401 && context.req) {
    // Unauthenticated on server side, manipulate context res
    context.res.writeHead(302, {
      Location: Paths.Authentication.path,
    });
    return {};
  }

  const response = await request.json();
  return {
    props: {
      currentUser: response,
    },
  };
};

export default UserProfile;
