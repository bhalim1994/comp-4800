import axios from "axios";
import qs from "qs";

export const DEFAULT_API = axios.create({
  baseURL: process.env.REACT_APP_API,
  paramsSerializer: (params) => qs.stringify(params, { arrayFormat: "repeat" }),
});

export const setDefaultHeader = (token) => {
  DEFAULT_API.defaults.headers.common["Authorization"] = `Bearer ${token}`;
  if (token) {
    DEFAULT_API.defaults.headers.common[
      "AuthorizationInternal"
    ] = `Bearer ${token}`;
  }
};
