import router from "next/router";
import { useCallback } from "react";

export const generateHexColor = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);

export const useRouterRefresh = () => {
  const { asPath } = router;

  return router.replace(asPath);
};
