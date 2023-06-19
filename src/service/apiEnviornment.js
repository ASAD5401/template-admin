import axios from "axios";
import { getToken } from "../helper/tokenHelper";

const baseUrl = "http://localhost:4000/v1";

export const axiosApi = async (method, url, data = {}, options = {}) => {
  const allowedMethods = ["GET", "POST", "PATCH", "DELETE", "PUT"];
  method = method.toUpperCase();

  const methodFound = allowedMethods.find(
    (allowedMethod) => allowedMethod === method
  );
  if (!methodFound) {
    throw "Invalid format";
  }


  let reqConfig = {
    url: `${baseUrl}${url}`,
    method,
    params: options.params,
    headers: {
      Authorization: `Bearer ${getToken()}`
    }
  };
  if (method === "POST" || method === "PUT" || method === "DELETE") {
    reqConfig["data"] = data;
  }
  return axios(reqConfig)
    .then((resp) => resp?.data)
    .catch((err) => {
      return Promise.reject(err);
    })
    .catch((err) => {
      if (err?.response?.status === 401) {
        console.log("unauthorized");
      }
      return Promise.reject(err?.response?.data?.message);
    });
};
