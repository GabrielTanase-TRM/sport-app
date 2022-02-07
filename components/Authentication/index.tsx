import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { useRouter } from "next/router";

import { Endpoint } from "../../services/services.enum";
import { postAuth } from "../../services/auth";

import { TextInput } from "../TextInput";
import LoadingOverlay from "../LoadingOverlay";
import SwitchButton from "../SwitchButton";

import { validation } from "../../shared/regExValidation";

import { tReplace } from "../../locales/locales.utils";
import { useTranslation } from "../../shared/hooks/useTranslation";

import EyeOn from "../../public/assets/icons/eye.svg";
import EyeOff from "../../public/assets/icons/eye-off.svg";
import Locked from "../../public/assets/icons/locked.svg";
import Mail from "../../public/assets/icons/mail.svg";

export const Authentication = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState(null);

  const { translate } = useTranslation();
  const router = useRouter();

  const {
    control,
    reset,
    handleSubmit,
    getValues,
    trigger,
    clearErrors,
    register,
    formState: { errors, isValid },
  } = useForm({ mode: "onChange" });

  const checkboxHandler = (value) => {
    if (isSignUp != value) {
      setIsSignUp(value);
    }
  };

  const submitForm = (data, event) => {
    const typeOfRequest = event.target.getAttribute("data-req");

    const bodyData = Object.create({});
    bodyData.email = data.email;
    bodyData.password = data.password;
    if (typeOfRequest === Endpoint.Signup) {
      bodyData.isTrainer = Boolean(data.isTrainer);
      bodyData.firstName = data.firstName;
      bodyData.lastName = data.lastName;
    }

    setLoading(true);
    postAuth(typeOfRequest, bodyData)
      .then((response) => {
        if (response.status === 200 || response.status === 201) {
          setServerError(null);
          clearErrors();
          reset(null);
          if (typeOfRequest === Endpoint.Signup) {
            postAuth(Endpoint.Login, {
              email: bodyData.email,
              password: bodyData.password,
            })
              .then(() => router.push("/"))
              .catch((error) => setServerError(error?.response?.data?.message));
          } else router.push("/");
        }
      })
      .catch((error) => {
        setServerError(error?.response?.data?.message);
        setLoading(false);
      });
  };
  const formHasErrors = () => trigger();
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const eyesProps = {
    className: "text-black dark:text-lightBackground",
    onClick: togglePasswordVisibility,
    width: "100%",
    height: "100%",
    preserveAspectRatio: "none",
  };

  return (
    <div className="h-full w-full">
      {loading ? (
        <LoadingOverlay overlay={true} />
      ) : (
        <div>
          <SwitchButton
            value={isSignUp}
            onChange={checkboxHandler}
            leftContent={translate.login.toUpperCase()}
            rightContent={translate.signup.toUpperCase()}
          />
          {isSignUp ? (
            <form
              className="w-full flex flex-col items-center"
              data-req={Endpoint.Signup}
              onSubmit={handleSubmit(submitForm, formHasErrors)}
            >
              <Controller
                control={control}
                name="firstName"
                defaultValue=""
                rules={{
                  required: {
                    value: true,
                    message: translate.validationReqField,
                  },
                  minLength: {
                    value: 3,
                    message: tReplace(
                      { number: "3" },
                      translate.validationMinCharacter
                    ),
                  },
                  maxLength: {
                    value: 24,
                    message: tReplace(
                      { number: "24" },
                      translate.validationMaxCharacter
                    ),
                  },
                  validate: (firstName) =>
                    validation.lettersOnly.test(firstName.trim())
                      ? true
                      : translate.validationLettersOnly,
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    inputId="firstName"
                    type="text"
                    placeHolder="First name"
                    onChange={onChange}
                    value={value}
                    label="Fist Name"
                    hasError={!!errors.firstName}
                    errorMessage={
                      !!errors.firstName && errors.firstName.message
                    }
                    required
                  />
                )}
              />

              <Controller
                control={control}
                name="lastName"
                defaultValue=""
                rules={{
                  required: {
                    value: true,
                    message: translate.validationReqField,
                  },
                  minLength: {
                    value: 3,
                    message: tReplace(
                      { number: "3" },
                      translate.validationMinCharacter
                    ),
                  },
                  maxLength: {
                    value: 24,
                    message: tReplace(
                      { number: "24" },
                      translate.validationMaxCharacter
                    ),
                  },
                  validate: (lastName) =>
                    validation.lettersOnly.test(lastName.trim())
                      ? true
                      : translate.validationLettersOnly,
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    inputId="lastName"
                    type="text"
                    placeHolder="Last name"
                    onChange={onChange}
                    value={value}
                    label="Last Name"
                    hasError={!!errors.lastName}
                    errorMessage={!!errors.lastName && errors.lastName.message}
                    required
                  />
                )}
              />
              <Controller
                control={control}
                name="email"
                defaultValue=""
                rules={{
                  required: {
                    value: true,
                    message: translate.validationReqField,
                  },
                  validate: (email) =>
                    validation.email.test(email.toLowerCase())
                      ? true
                      : translate.validationInvalidEmail,
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    inputId="text"
                    type="text"
                    placeHolder="name@example.com"
                    onChange={onChange}
                    value={value}
                    label="Email address"
                    hasError={!!errors.email}
                    errorMessage={!!errors.email && errors.email.message}
                    required
                  />
                )}
              />
              <Controller
                control={control}
                name="password"
                defaultValue=""
                rules={{
                  required: {
                    value: true,
                    message: translate.validationReqField,
                  },
                  minLength: {
                    value: 6,
                    message: tReplace(
                      { number: "6" },
                      translate.validationMinCharacter
                    ),
                  },
                  maxLength: {
                    value: 24,
                    message: tReplace(
                      { number: "24" },
                      translate.validationMaxCharacter
                    ),
                  },
                  validate: (password) =>
                    validation.oneLowerUpperDigit.test(password)
                      ? true
                      : translate.validationPassword,
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    inputId="password"
                    type="password"
                    placeHolder="Type password"
                    onChange={onChange}
                    value={value}
                    label="Password"
                    hasError={!!errors.password}
                    errorMessage={!!errors.password && errors.password.message}
                    required
                  />
                )}
              />
              <Controller
                control={control}
                name="rePassword"
                defaultValue=""
                rules={{
                  required: {
                    value: true,
                    message: translate.validationReqField,
                  },
                  minLength: {
                    value: 6,
                    message: tReplace(
                      { number: "6" },
                      translate.validationMinCharacter
                    ),
                  },
                  maxLength: {
                    value: 24,
                    message: tReplace(
                      { number: "24" },
                      translate.validationMaxCharacter
                    ),
                  },
                  validate: (rePassword) =>
                    rePassword === getValues("password")
                      ? true
                      : translate.validationRePassword,
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    inputId="rePassword"
                    type="password"
                    placeHolder="Repeat password"
                    onChange={onChange}
                    value={value}
                    label="Repeat password"
                    hasError={!!errors.rePassword}
                    errorMessage={
                      !!errors.rePassword && errors.rePassword.message
                    }
                    required
                  />
                )}
              />
              <div className="w-full">
                <Controller
                  control={control}
                  name="isTrainer"
                  defaultValue=""
                  render={({ field: { onChange, value } }) => (
                    <div className="flex items-center">
                      <p className="mr-2">{translate.authAreYouTrainer}</p>
                      <input
                        id="isTrainer"
                        type="checkbox"
                        onChange={onChange}
                        value={value}
                        {...register}
                      />
                    </div>
                  )}
                />
              </div>
              {!!serverError && <div>{serverError}</div>}
              <label className="flex justify-center mt-5">
                <button
                  className={`border border-turquoise rounded-md py-1 px-2 ${
                    !isValid && "bg-gray-600 text-gray-800 border-gray-600"
                  }`}
                  type="submit"
                  value="Submit"
                  disabled={!isValid}
                >
                  {translate.signup.toUpperCase()}
                </button>
              </label>
            </form>
          ) : (
            <form
              className="w-full flex flex-col items-center"
              data-req={Endpoint.Login}
              onSubmit={handleSubmit(submitForm)}
            >
              <Controller
                control={control}
                name="email"
                defaultValue=""
                rules={{
                  required: {
                    value: true,
                    message: translate.validationReqField,
                  },
                  validate: (email) =>
                    validation.email.test(email.toLowerCase())
                      ? true
                      : translate.validationInvalidEmail,
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    inputId="email"
                    type="email"
                    placeHolder="name@example.com"
                    onChange={onChange}
                    value={value}
                    label="Email address"
                    hasError={!!errors.email}
                    leftIcon={<Mail width={"100%"} height={"100%"} />}
                    errorMessage={!!errors.email && errors.email.message}
                    required
                  />
                )}
              />
              <Controller
                control={control}
                name="password"
                defaultValue=""
                rules={{
                  required: {
                    value: true,
                    message: translate.validationReqField,
                  },
                  minLength: {
                    value: 6,
                    message: tReplace(
                      { number: "6" },
                      translate.validationMinCharacter
                    ),
                  },
                  maxLength: {
                    value: 24,
                    message: tReplace(
                      { number: "24" },
                      translate.validationMaxCharacter
                    ),
                  },
                  validate: (password) =>
                    validation.oneLowerUpperDigit.test(password)
                      ? true
                      : translate.validationPassword,
                }}
                render={({ field: { onChange, value } }) => (
                  <TextInput
                    inputId="password"
                    type={showPassword ? "text" : "password"}
                    placeHolder="Type password"
                    onChange={onChange}
                    value={value}
                    label="Password"
                    hasError={!!errors.password}
                    leftIcon={<Locked width={"100%"} height={"100%"} />}
                    rightIcon={
                      showPassword ? (
                        <EyeOff {...eyesProps} />
                      ) : (
                        <EyeOn {...eyesProps} />
                      )
                    }
                    errorMessage={!!errors.password && errors.password.message}
                    required
                  />
                )}
              />
              {!!serverError && <div>{serverError}</div>}
              <label className="flex justify-center">
                <button
                  type="submit"
                  value="Submit"
                  disabled={!isValid}
                  className={`border border-turquoise rounded-md py-1 px-2 ${
                    !isValid && "bg-gray-600 text-gray-800 border-gray-600"
                  }`}
                >
                  {translate.login.toUpperCase()}
                </button>
              </label>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
