import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="icon" href="../public/favicon.ico" />
          <meta
            name="viewport"
            content="initial-scale=1.0, width=device-width"
          />
        </Head>
        <body className="bg-lightBackground text-primary dark:bg-darkBackground">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
