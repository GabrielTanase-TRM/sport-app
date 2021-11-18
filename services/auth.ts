import axios from "axios";
import { Endpoint } from "./services.enum";
import { AuthBodyProps } from "./services.interface";
// require("dotenv").config({ path: "../../.env" });

const headers = {
  "Content-Type": "application/json",
};

export const postAuth = (endpoint: Endpoint, body: AuthBodyProps) => {
  return axios({
    method: "POST",
    headers,
    data: body,
    url: `api/${endpoint}`,
  });
};

export const logout = () => axios(`http://localhost:3000/api/logout`);
