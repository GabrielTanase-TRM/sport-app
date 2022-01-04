export const tReplace = (
  replaceConfig: { [key: string]: string },
  replacedLocale: string
) => {
  let finalReplacedLocale: string = replacedLocale;

  Object.keys(replaceConfig).forEach((replaceKey) => {
    finalReplacedLocale = finalReplacedLocale.replace(
      new RegExp(`{{${replaceKey}}}`, "g"),
      replaceConfig[replaceKey]
    );
  });

  return finalReplacedLocale;
};
