import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Paths } from "../../shared/paths.const";
import fetch from "isomorphic-fetch";
import { isEmpty } from "lodash";
import { NextPageContext } from "next";
import { useRouter } from "next/router";
import axios from "axios";
import { logout } from "../../services/auth";

const Home = ({ user }: any) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  console.log(user);
  useEffect(() => {
    if (!isEmpty(user)) {
      setIsLoggedIn(true);
    }
  }, [user]);

  const logoutHandler = () =>
    logout().then((res) => {
      if (res.status === 200) {
        router.reload();
      }
    });

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <div className="absolute top-9 flex justify-between items-center w-full h-8 px-3">
        {isLoggedIn ? (
          <button onClick={logoutHandler}>Logout</button>
        ) : (
          <Link href={Paths.Authentication.path}>
            {Paths.Authentication.name}
          </Link>
        )}
        <Link href={Paths.Profile.path}>{Paths.Profile.name}</Link>
        <Link href={Paths.Members.path}>{Paths.Members.name}</Link>
        <Link href={Paths.Trainers.path}>{Paths.Trainers.name}</Link>
        <Link href={Paths.About.path}>{Paths.About.name}</Link>
        <Link href={Paths.Contact.path}>{Paths.Contact.name}</Link>
        <Link href={Paths.Help.path}>{Paths.Help.name}</Link>
      </div>
      <p className="mb-2">Hello world from Homepage</p>
      {user && <p className="mb-2">Hello {user.email}</p>}
      {user && <p className="mb-2"> Trainer ? {String(user.isTrainer)}</p>}
      <div className="absolute top-4 right-4 text-redWarning">
        {isLoggedIn ? "LOGGED IN" : "NOT LOGGED IN"}
      </div>
    </div>
  );
};

Home.getInitialProps = async (context: NextPageContext) => {
  const cookie = context.req?.headers.cookie;

  const request = await fetch("http://localhost:3000/api/user", {
    headers: {
      cookie: cookie!,
    },
  });
  if (request.status === 401 && !context.req) {
    // Unauthenticated on client side, manipulate router
    return {
      user: null,
    };
  }

  if (request.status === 401 && context.req) {
    // Unauthenticated on server side, manipulate context res
    // context.res.writeHead(302, {
    //   Location: "http://localhost:3000/login",
    // });
    return {
      user: null,
    };
  }

  const response = await request.json();
  return {
    user: response,
  };
};
// export const getStaticProps = async () => {
//   const data = axios.get("http://localhost:3000/api/user");
//   const response = await data;

//   return {
//     props: {
//       user: response.data,
//     },
//     revalidate: 10,
//   };
// };
export default Home;
