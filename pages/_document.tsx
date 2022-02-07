import React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";
import { BRANDING_NAME } from "../shared/shared.const";

const APP_DESCRIPTION: string = "Smart application fort sportive society";

const fontsBasePath = "/fonts/";
const fontsURL = [
  "Inter/Inter-Thin.ttf",
  "Inter/Inter-Regular.ttf",
  "Inter/Inter-Medium.ttf",
  "Inter/Inter-SemiBold.ttf",
  "Inter/Inter-Bold.ttf",
  "Inter/Inter-ExtraBold.ttf",
  "Playfair_Display/PlayfairDisplay-Regular.ttf",
  "Playfair_Display/PlayfairDisplay-Medium.ttf",
  "Playfair_Display/PlayfairDisplay-SemiBold.ttf",
  "Playfair_Display/PlayfairDisplay-Bold.ttf",
  "Playfair_Display/PlayfairDisplay-ExtraBold.ttf",
  "GermaniaOne-Regular.ttf",
];

const allFontsLink = () =>
  fontsURL.map((fontPath, i) => (
    <link
      key={i}
      rel="preload"
      href={fontsBasePath + fontPath}
      as="font"
      crossOrigin="anonymous"
    />
  ));

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <link rel="shortcut icon" href="/favicon/favicon.ico" />
          <link
            rel="apple-touch-icon"
            sizes="57x57"
            href="favicon/apple-icon-57x57.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="60x60"
            href="favicon/apple-icon-60x60.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="72x72"
            href="favicon/apple-icon-72x72.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="76x76"
            href="favicon/apple-icon-76x76.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="114x114"
            href="favicon/apple-icon-114x114.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="120x120"
            href="favicon/apple-icon-120x120.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="144x144"
            href="favicon/apple-icon-144x144.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="152x152"
            href="favicon/apple-icon-152x152.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="180x180"
            href="favicon/apple-icon-180x180.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="192x192"
            href="favicon/android-icon-192x192.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="32x32"
            href="favicon/favicon-32x32.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="96x96"
            href="favicon/favicon-96x96.png"
          />
          <link
            rel="icon"
            type="image/png"
            sizes="16x16"
            href="favicon/favicon-16x16.png"
          />
          <link rel="manifest" href="/manifest.json" />
          <meta name="theme-color" content="#ffffff"></meta>
          <meta name="application-name" content={BRANDING_NAME} />
          <meta name="description" content={APP_DESCRIPTION} />
          {allFontsLink()}
        </Head>
        <body className="bg-lightBackground text-primaryText dark:text-darkPrimaryText dark:bg-darkBackground font-primary">
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
