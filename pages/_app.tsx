import "../styles/globals.css";
import React, { useEffect, useState } from "react";

import Head from "next/head";
import App, { AppContext } from "next/app";
import { ThemeProvider } from "next-themes";

import { Provider } from "react-redux";
import { initializeStore } from "../redux";

import useCookie from "../shared/hooks/useCookie";

import { QueryClient, QueryClientProvider } from "react-query";

import Layout from "../components/Layout";

import { MyAppProps } from "../shared/shared.interface";
import { BASE_URL } from "../services/service.const";
import { BRANDING_NAME } from "../shared/shared.const";

const MyApp: React.FC<MyAppProps> = ({ Component, pageProps }) => {
  const [deferredPrompt, setDeferredPrompt] = useState(null);
  const [cookie, setCookie] = useCookie("sport-app-installed", false);
  const { initialReduxState } = pageProps;
  const reduxStore = initializeStore(initialReduxState);
  // const queryClient = new QueryClient();

  // Handle PWA installation process
  useEffect(() => {
    if (!cookie) {
      window.addEventListener("beforeinstallprompt", (e) => {
        e.preventDefault();
        setDeferredPrompt(e);
      });
    }

    window.addEventListener("appinstalled", (e) => {
      // Set sport-app-installed cookie [true] for 10 years
      setCookie(true, 2038);
      setDeferredPrompt(null);
    });
  }, []);

  return (
    // <QueryClientProvider client={queryClient}>
    <Provider store={reduxStore}>
      <ThemeProvider defaultTheme="system" attribute="class">
        <Layout deferredPrompt={deferredPrompt}>
          <Head>
            <title>{BRANDING_NAME}</title>
            <meta
              name="viewport"
              content="initial-scale=1.0, width=device-width"
            />
          </Head>
          <Component {...pageProps} deferredPrompt={deferredPrompt} />
        </Layout>
      </ThemeProvider>
    </Provider>
    // </QueryClientProvider>
  );
};

export default MyApp;

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext);

  const reduxStore = initializeStore({});
  const cookie = appContext.ctx.req?.headers.cookie;

  const request = await fetch(`${BASE_URL}api/user`, {
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
