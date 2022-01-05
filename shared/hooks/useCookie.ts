import { useEffect, useState } from "react";

type Value = string | number | boolean;
type getItemType = (key: string) => Value;
type setItemType = (key: string, value: Value, numberOfDays: number) => void;
type updateCookieType = (value: Value, numberOfDays: number) => void;
type useCookieType = (key: string, value: Value) => [Value, updateCookieType];

// Get item from Cookie based on KEY
const getItem: getItemType = (key) =>
  document.cookie.split("; ").reduce((total, currentCookie) => {
    const item = currentCookie.split("=");
    const storedKey = item[0];
    const storedValue = item[1];
    return key === storedKey ? decodeURIComponent(storedValue) : total;
  }, "");

// Set item in Cookie under KEY with a VALUE and EXPIRATION date
// EXPIRATION: for maximum period use numberOfDays: 2038
const setItem: setItemType = (key, value, numberOfDays) => {
  // Set a far future absolute time: YEAR 2038
  if (numberOfDays === 2038) {
    document.cookie = `${key}=${value}; expires=2147483647; path=/`;
  } else {
    const now = new Date();
    // Set the time to be now + numberOfDays
    now.setTime(now.getTime() + numberOfDays * 60 * 60 * 24 * 1000);
    document.cookie = `${key}=${value}; expires=${now.toUTCString()}; path=/`;
  }
};

const useCookie: useCookieType = (key, defaultValue) => {
  const getCookie = () => getItem(key) || defaultValue;
  const [cookie, setCookie] = useState<Value>("");

  useEffect(() => {
    setCookie(getCookie());
  }, []);

  const updateCookie: updateCookieType = (value, numberOfDays) => {
    setCookie(value);
    setItem(key, value, numberOfDays);
  };

  return [cookie, updateCookie];
};
export default useCookie;
