import "../styles/globals.css";
import React from "react";

interface MyAppProps {
  Component: any;
  pageProps: any;
}

const MyApp: React.FC<MyAppProps> = ({ Component, pageProps }) => {
  return <Component {...pageProps} />;
};

export default MyApp;
