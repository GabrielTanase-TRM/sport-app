import axios from "axios";
import { BASE_URL, headers } from "./service.const";
import { Endpoint, Method } from "./services.enum";

// Based on trainersOnly query it will return trainers or members list
export const getMembers = (trainersOnly: boolean = false) =>
  axios({
    method: Method.GET,
    headers,
    baseURL: BASE_URL,
    url: `${Endpoint.Members}?trainersOnly=${trainersOnly}`,
  });
