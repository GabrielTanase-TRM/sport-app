import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";
import SwitchButton from "../SwitchButton";
import { WidthButton } from "../SwitchButton/SwitchButton.enum";

const LocalesSwitch = () => {
  const [isENLocale, setIsENLocale] = useState(false);
  const router = useRouter();
  const { pathname, query, asPath } = router;

  useEffect(() => {
    setIsENLocale(router.locale === "en");
  }, [router]);

  useEffect(() => {
    router.push({ pathname, query }, asPath, {
      locale: isENLocale ? "en" : "ro",
    });
  }, [isENLocale]);

  const onChangeLocale = (value) => {
    if (isENLocale != value) {
      setIsENLocale(value);
    }
  };

  return (
    <div>
      <SwitchButton
        widthButton={WidthButton.xs}
        value={isENLocale}
        onChange={onChangeLocale}
        leftContent={"ROM"}
        rightContent={"EN"}
      />
    </div>
  );
};

export default LocalesSwitch;
