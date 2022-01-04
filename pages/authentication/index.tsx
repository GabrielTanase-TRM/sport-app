import React from "react";
import { Authentication } from "../../components/Authentication";
import { useTranslation } from "../../shared/hooks/useTranslation";
import { BRANDING_NAME, POWERED_BY } from "../../shared/shared.const";

const Auth = () => {
  const { translate } = useTranslation();

  return (
    <div className="w-full h-full flex items-center flex-col py-5 px-5">
      <div className="mt-14">
        <h1 className="text-center">
          {translate.authWelcome} <strong>{BRANDING_NAME}</strong>
        </h1>
        <p className="text-center mt-2">{translate.authHeadline}</p>
      </div>
      <Authentication />
      <h2 className="mt-8">
        {translate.allRights}
        {POWERED_BY}
      </h2>
    </div>
  );
};

export default Auth;
