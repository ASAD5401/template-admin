import { retrieveData } from "./storageHelper";
// import authConfig from "../configs/auth";

export const getToken = () => {
  // const token = retrieveData(authConfig.storageTokenKeyName);
  const token = retrieveData("token");

  return token;
};
