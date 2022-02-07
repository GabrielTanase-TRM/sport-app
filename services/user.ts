import axios from "axios";
import { BASE_URL, headers } from "./service.const";
import { Endpoint, Method } from "./services.enum";

export const updateAvatar = (body: { avatarURL: string }) =>
  axios({
    method: Method.POST,
    headers,
    data: body,
    baseURL: BASE_URL,
    url: Endpoint.updateAvatar,
  });
