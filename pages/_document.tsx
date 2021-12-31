import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head />
        <body className="bg-lightBackground text-primary dark:bg-darkBackground">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
