import axios from "axios";
import { BASE_URL, headers } from "./service.const";
import { Endpoint, Method } from "./services.enum";
import { AuthBodyProps } from "./services.interface";

export const postAuth = (endpoint: Endpoint, body: AuthBodyProps) => {
  return axios({
    method: Method.POST,
    headers,
    data: body,
    baseURL: BASE_URL,
    url: endpoint,
  });
};

export const logout = () =>
  axios({
    method: Method.GET,
    headers,
    baseURL: BASE_URL,
    url: Endpoint.Logout,
  });
