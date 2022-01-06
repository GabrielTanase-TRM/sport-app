import React, { useEffect } from "react";
import Link from "next/link";
import { Paths } from "../../shared/paths.const";
import { getMembers } from "../../services/members";
import Router from "next/router";
import { BASE_URL } from "../../services/service.const";
import { GetServerSidePropsContext } from "next";
import TrainersList from "../../components/Trainers/TrainersList";

const Trainers = ({ trainers }) => {
  useEffect(() => {
    console.log(trainers);
  }, []);
  return (
    <div className="h-full w-full flex justify-center">
      <TrainersList trainers={trainers} />
    </div>
  );
};

export const getServerSideProps = async (
  context: GetServerSidePropsContext
) => {
  const cookie = context.req?.headers.cookie;

  const request = await fetch(`${BASE_URL}api/members?trainersOnly=true`, {
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
      trainers: response?.users,
    },
  };
};

export default Trainers;
