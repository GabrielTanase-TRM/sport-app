import { useRouter } from "next/router";
import { en } from "../../locales/en";
import { Locales } from "../../locales/locales.type";
import { ro } from "../../locales/ro";

export const useTranslation: (...args: any[]) => {
  translate: Locales;
} = () => {
  const { locale } = useRouter();

  return {
    translate: locale === "en" ? en : ro,
  };
};
