import router from "next/router";

export const generateHexColor: () => string = () =>
  "#" + Math.floor(Math.random() * 16777215).toString(16);

export const useRouterRefresh = () => {
  const { asPath } = router;

  return router.replace(asPath);
};

export const getImageDimensionByAspectRatio = (
  width: number,
  image: {
    width: number;
    height: number;
  }
) => {
  const imageHeight = image.height;
  const imageWidth = image.width;

  return { height: (width * imageHeight) / imageWidth, width };
};
