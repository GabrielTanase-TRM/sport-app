import React from "react";
import { Authentication } from "../../components/Authentication";
import { t } from "../../locales/locales.utils";
import { BRANDING_NAME, POWERED_BY } from "../../shared/shared.const";

const Auth = () => {
  return (
    <div className="w-full h-full flex items-center flex-col py-5 px-5">
      <div className="mt-14">
        <h1 className="text-center">
          {t("auth_welcome")} <strong>{BRANDING_NAME}</strong>
        </h1>
        <p className="text-center mt-2">{t("auth_headline")}</p>
      </div>
      <Authentication />
      <h2 className="mt-8">
        {t("all_rights")}
        {POWERED_BY}
      </h2>
    </div>
  );
};

export default Auth;
