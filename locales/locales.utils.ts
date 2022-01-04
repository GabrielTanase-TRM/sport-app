import { useRouter } from "next/router";
import { en } from "./en";
import { ro } from "./ro";

export const t = (string: string) => {
  const router = useRouter();
  return router.locale === "en" ? en[string] : ro[string];
};

export const tReplace = (
  replaceConfig: { [key: string]: string },
  replacedLocale: string
) => {
  let finalReplacedLocale: string = t(replacedLocale);

  Object.keys(replaceConfig).forEach((replaceKey) => {
    finalReplacedLocale = finalReplacedLocale.replace(
      new RegExp(`{{${replaceKey}}}`, "g"),
      replaceConfig[replaceKey]
    );
  });

  return finalReplacedLocale;
};
