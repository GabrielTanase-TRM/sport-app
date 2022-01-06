import React from "react";
// import fetch from "isomorphic-fetch";
// import { isEmpty } from "lodash";
// import { NextPageContext } from "next";
// import LocalesSwitch from "../../Components/LocalesSwitch";
import { useSelector } from "react-redux";
import { getIsLoggedIn, getUser } from "../../redux/selectors";
import { useTranslation } from "../../shared/hooks/useTranslation";

const Homepage = () => {
  const isLoggedIn = useSelector(getIsLoggedIn);
  const user = useSelector(getUser);
  const { translate } = useTranslation();

  return (
    <div className="w-screen h-screen flex items-center justify-center flex-col">
      <div>
        <p className="mb-2">{translate.welcome} Homepage</p>
        <div>{/* <LocalesSwitch /> */}</div>
      </div>
      {user && <p className="mb-2">Hello {user.email}</p>}
      {user && <p className="mb-2"> Trainer ? {String(user.isTrainer)}</p>}
      <div className="absolute top-4 right-4 text-redError">
        {isLoggedIn ? "LOGGED IN" : "NOT LOGGED IN"}
      </div>
    </div>
  );
};

// Home.getInitialProps = async (context: NextPageContext) => {
//   const cookie = context.req?.headers.cookie;

//   const request = await fetch("http://localhost:3000/api/user", {
//     headers: {
//       cookie: cookie!,
//     },
//   });
//   if (request.status === 401 && !context.req) {
//     // Unauthenticated on client side, manipulate router
//     return {
//       user: null,
//     };
//   }

//   if (request.status === 401 && context.req) {
//     // Unauthenticated on server side, manipulate context res
//     return {
//       user: null,
//     };
//   }

//   const response = await request.json();

//   console.log(response);
//   return {
//     user: response,
//   };
// };

export default Homepage;
