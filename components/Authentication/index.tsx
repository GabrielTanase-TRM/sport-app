import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Endpoint } from "../../services/services.enum";
import { TextInput } from "../TextInput";
import EyeOn from "../../public/assets/icons/eye.svg";
import EyeOff from "../../public/assets/icons/eye-off.svg";
import Locked from "../../public/assets/icons/locked.svg";
import Mail from "../../public/assets/icons/mail.svg";
import { useRouter } from "next/router";
import { postAuth } from "../../services/user";
import { validation } from "../../shared/regExValidation";
import SwitchButton from "../SwitchButton";
import LoadingOverlay from "../LoadingOverlay";
import { t, tReplace } from "../../locales/locales.utils";

export const Authentication = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [serverError, setServerError] = useState(null);

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
      })
      .finally(() => setLoading(false));
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
            leftContent={t("login").toUpperCase()}
            rightContent={t("signup").toUpperCase()}
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
                    message: t("validation_req_field"),
                  },
                  minLength: {
                    value: 3,
                    message: tReplace(
                      { number: "3" },
                      "validation_min_character"
                    ),
                  },
                  maxLength: {
                    value: 24,
                    message: tReplace(
                      { number: "24" },
                      "validation_max_character"
                    ),
                  },
                  validate: (firstName) =>
                    validation.lettersOnly.test(firstName.trim())
                      ? true
                      : t("validation_letters_only"),
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
                    message: t("validation_req_field"),
                  },
                  minLength: {
                    value: 3,
                    message: tReplace(
                      { number: "3" },
                      "validation_min_character"
                    ),
                  },
                  maxLength: {
                    value: 24,
                    message: tReplace(
                      { number: "24" },
                      "validation_max_character"
                    ),
                  },
                  validate: (lastName) =>
                    validation.lettersOnly.test(lastName.trim())
                      ? true
                      : t("validation_letters_only"),
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
                    message: t("validation_req_field"),
                  },
                  validate: (email) =>
                    validation.email.test(email.toLowerCase())
                      ? true
                      : t("validation_invalid_email"),
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
                    message: t("validation_req_field"),
                  },
                  minLength: {
                    value: 6,
                    message: tReplace(
                      { number: "6" },
                      "validation_min_character"
                    ),
                  },
                  maxLength: {
                    value: 24,
                    message: tReplace(
                      { number: "24" },
                      "validation_max_character"
                    ),
                  },
                  validate: (password) =>
                    validation.oneLowerUpperDigit.test(password)
                      ? true
                      : t("validation_password"),
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
                    message: t("validation_req_field"),
                  },
                  minLength: {
                    value: 6,
                    message: tReplace(
                      { number: "6" },
                      "validation_min_character"
                    ),
                  },
                  maxLength: {
                    value: 24,
                    message: tReplace(
                      { number: "24" },
                      "validation_max_character"
                    ),
                  },
                  validate: (rePassword) =>
                    rePassword === getValues("password")
                      ? true
                      : t("validation_rePassword"),
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
                      <p className="mr-2"> Are you a Trainer?</p>
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
                  className={`border border-turquoise rounded-sm py-1 px-2 ${
                    !isValid && "bg-gray-600 text-gray-800 border-gray-600"
                  }`}
                  type="submit"
                  value="Submit"
                  disabled={!isValid}
                >
                  {t("signup").toUpperCase()}
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
                    message: t("validation_req_field"),
                  },
                  validate: (email) =>
                    validation.email.test(email.toLowerCase())
                      ? true
                      : t("validation_invalid_email"),
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
                    message: t("validation_req_field"),
                  },
                  minLength: {
                    value: 6,
                    message: tReplace(
                      { number: "6" },
                      "validation_min_character"
                    ),
                  },
                  maxLength: {
                    value: 24,
                    message: tReplace(
                      { number: "24" },
                      "validation_max_character"
                    ),
                  },
                  validate: (password) =>
                    validation.oneLowerUpperDigit.test(password)
                      ? true
                      : t("validation_password"),
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
                  className={`border border-turquoise rounded-sm py-1 px-2 ${
                    !isValid && "bg-gray-600 text-gray-800 border-gray-600"
                  }`}
                >
                  {t("login").toUpperCase()}
                </button>
              </label>
            </form>
          )}
        </div>
      )}
    </div>
  );
};
