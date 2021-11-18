import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Endpoint } from "../services/services.enum";
import { TextInput } from "./TextInput/TextInput";
import EyeOn from "../public/assets/icons/eye.svg";
import EyeOff from "../public/assets/icons/eye-off.svg";
import Locked from "../public/assets/icons/locked.svg";
import Mail from "../public/assets/icons/mail.svg";
import { useRouter } from "next/router";
import { postAuth } from "../services/auth";
import { validation } from "../shared/regExValidation";

const Authentication = () => {
  const [isLogin, setIsLogin] = useState(false);
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
    formState: { errors, isValid },
  } = useForm({ mode: "all" });

  const checkboxHandler = (e) => {
    setIsLogin(e.target.checked);
  };

  const submitForm = (data, event) => {
    const typeOfRequest = event.target.getAttribute("data-req");

    const bodyData = Object.create({});
    bodyData.email = data.email;
    bodyData.password = data.password;
    if (typeOfRequest === Endpoint.Signup) {
      bodyData.isTrainer = data.isTrainer;
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
  const formHasErrors = (errors) => (trigger(), console.log(errors));
  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  // login:: Password rules-> one uppercase, one number
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <div className="w-full h-full flex justify-center items-center">
          <div className="h-5/6">
            <div className="c-LoginSignup__switcherContainer">
              <span className="c-LoginSignup__switcher c-LoginSignup__switcher-1">
                <input
                  type="checkbox"
                  id="switcher"
                  name="switcher"
                  checked={isLogin}
                  onChange={checkboxHandler}
                />
                <label htmlFor="switcher" />
              </span>
            </div>
            {isLogin ? (
              <form
                className="w-full"
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
                      message: "This field is required",
                    },
                    minLength: {
                      value: 3,
                      message: "Min character 3",
                    },
                    maxLength: {
                      value: 24,
                      message: "Max character 24",
                    },
                    validate: (firstName) =>
                      validation.lettersOnly.test(firstName.trim())
                        ? true
                        : "Please use letters only.",
                  }}
                  render={({ field: { onChange, onBlur, ref, value } }) => (
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
                      message: "This field is required",
                    },
                    minLength: {
                      value: 3,
                      message: "Min character 3",
                    },
                    maxLength: {
                      value: 24,
                      message: "Max character 24",
                    },
                    validate: (lastName) =>
                      validation.lettersOnly.test(lastName.trim())
                        ? true
                        : "Please use letters only.",
                  }}
                  render={({ field: { onChange, onBlur, ref, value } }) => (
                    <TextInput
                      inputId="lastName"
                      type="text"
                      placeHolder="Last name"
                      onChange={onChange}
                      value={value}
                      label="Last Name"
                      hasError={!!errors.lastName}
                      errorMessage={
                        !!errors.lastName && errors.lastName.message
                      }
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
                      message: "This field is required",
                    },
                    validate: (email) =>
                      validation.email.test(email.toLowerCase())
                        ? true
                        : "Invalid email.",
                  }}
                  render={({ field: { onChange, onBlur, ref, value } }) => (
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
                      message: "This field is required",
                    },
                    minLength: {
                      value: 6,
                      message: "Min character 6",
                    },
                    maxLength: {
                      value: 24,
                      message: "Max character 24",
                    },
                    validate: (password) =>
                      validation.oneLowerUpperDigit.test(password)
                        ? true
                        : "Password should have one uppercase and one number.",
                  }}
                  render={({ field: { onChange, onBlur, ref, value } }) => (
                    <TextInput
                      inputId="password"
                      type="password"
                      placeHolder="Type password"
                      onChange={onChange}
                      value={value}
                      label="Password"
                      hasError={!!errors.password}
                      errorMessage={
                        !!errors.password && errors.password.message
                      }
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
                      message: "This field is required",
                    },
                    minLength: {
                      value: 6,
                      message: "Min character 6",
                    },
                    maxLength: {
                      value: 24,
                      message: "Max character 24",
                    },
                    validate: (rePassword) =>
                      rePassword === getValues("password")
                        ? true
                        : "Password not equal",
                  }}
                  render={({ field: { onChange, onBlur, ref, value } }) => (
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
                <Controller
                  control={control}
                  name="isTrainer"
                  defaultValue=""
                  render={({ field: { onChange, onBlur, ref, value } }) => (
                    <div className="flex">
                      <p> Are you a Trainer?</p>
                      <input
                        id="isTrainer"
                        type="checkbox"
                        onChange={onChange}
                        value={value}
                      />
                    </div>
                  )}
                />
                {!!serverError && <div>{serverError}</div>}
                <label className="flex justify-center">
                  <button
                    className={`border border-turquoise rounded-sm py-1 px-2 ${
                      !isValid && "bg-gray-600 text-gray-800 border-gray-600"
                    }`}
                    type="submit"
                    value="Submit"
                    // disabled={!isValid}
                  >
                    SIGNUP
                  </button>
                </label>
              </form>
            ) : (
              <form
                className="c-form"
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
                      message: "This field is required",
                    },
                    validate: (email) =>
                      validation.email.test(email.toLowerCase())
                        ? true
                        : "Invalid email.",
                  }}
                  render={({ field: { onChange, onBlur, ref, value } }) => (
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
                      message: "This field is required",
                    },
                    minLength: {
                      value: 6,
                      message: "Min character 6",
                    },
                    maxLength: {
                      value: 24,
                      message: "Max character 24",
                    },
                    validate: (password) =>
                      validation.oneLowerUpperDigit.test(password)
                        ? true
                        : "Password should have one uppercase and one number.",
                  }}
                  render={({ field: { onChange, onBlur, ref, value } }) => (
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
                          <EyeOff
                            color={"#000"}
                            onClick={togglePasswordVisibility}
                            width={"100%"}
                            height={"100%"}
                            preserveAspectRatio="none"
                          />
                        ) : (
                          <EyeOn
                            color={"#000"}
                            onClick={togglePasswordVisibility}
                            width={"100%"}
                            height={"100%"}
                            preserveAspectRatio="none"
                          />
                        )
                      }
                      errorMessage={
                        !!errors.password && errors.password.message
                      }
                      required
                    />
                  )}
                />
                {!!serverError && <div>{serverError}</div>}
                <label className="flex justify-center">
                  <button
                    type="submit"
                    value="Submit"
                    // disabled={!isValid}
                    className={`border border-turquoise rounded-sm py-1 px-2 ${
                      !isValid && "bg-gray-600 text-gray-800 border-gray-600"
                    }`}
                  >
                    LOGIN
                  </button>
                </label>
              </form>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default Authentication;
