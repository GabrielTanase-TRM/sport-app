import "../styles/globals.css";
import React from "react";
import { Provider } from "react-redux";
import App, { AppContext } from "next/app";
import { initializeStore } from "../Redux/";

import { QueryClient, QueryClientProvider } from "react-query";

import Layout from "../Components/Layout";
import { MyAppProps } from "../Shared/shared.interface";

const MyApp: React.FC<MyAppProps> = ({ Component, pageProps }) => {
  const { initialReduxState } = pageProps;
  const reduxStore = initializeStore(initialReduxState);
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={reduxStore}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </Provider>
    </QueryClientProvider>
  );
};

export default MyApp;

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  const reduxStore = initializeStore({});
  const cookie = appContext.ctx.req?.headers.cookie;

  const request = await fetch("http://localhost:3000/api/user", {
    headers: {
      cookie: cookie!,
    },
  });

  appProps.pageProps = {
    ...appProps.pageProps,
    initialReduxState: reduxStore.getState(),
  };

  if (request.status === 401 && !appContext.ctx.req) {
    // Unauthenticated on client side, manipulate router
    return appProps;
  }

  if (request.status === 401 && appContext.ctx.req) {
    // Unauthenticated on server side, manipulate context res
    return appProps;
  }

  const user = await request.json();

  appProps.pageProps = {
    ...appProps.pageProps,
    initialReduxState: {
      ...reduxStore.getState(),
      user: user,
      isLoggedIn: true,
    },
  };

  return appProps;
};
