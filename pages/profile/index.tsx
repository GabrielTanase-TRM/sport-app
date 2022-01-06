import { useRouter } from "next/router";
import Router from "next/router";

import { BASE_URL } from "../../services/service.const";

import { Paths } from "../../shared/paths.const";

const Profile = () => {
  const router = useRouter();

  if (typeof window !== "undefined") {
    router.push(Paths.Authentication.path);
  } else router.push(Paths.Homepage.path);

  return;
};

Profile.getInitialProps = async ({ req, res }) => {
  const cookie = req?.headers.cookie;

  const request = await fetch(`${BASE_URL}api/user`, {
    headers: {
      cookie: cookie!,
    },
  });

  if (request.status === 401 && !req) {
    // Unauthenticated on client side, manipulate router
    Router.replace(Paths.Authentication.path);
    return {};
  }

  if (request.status === 401 && req) {
    // Unauthenticated on server side, manipulate context res
    res.writeHead(302, {
      Location: Paths.Authentication.path,
    });
    res.end();
    return {};
  }

  const response = await request.json();

  if (request.status >= 200) {
    res.writeHead(302, {
      Location: `/profile/${response.id}`,
    });
    res.end();
  }
  return {
    props: {
      reqStatus: request.status,
    },
  };
};

export default Profile;
