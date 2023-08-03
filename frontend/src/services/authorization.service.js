import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:4000/api/v1";

const getPublicContent = () => {
  return axios.get(API_URL + "/user");
};

const getUserBoard = () => {
    return axios.get(API_URL + "/user", { headers: authHeader() });
  };

  const getAdminBoard = () => {
    return axios.get(API_URL + "/admin", { headers: authHeader() });
  };

const userService = {
    getPublicContent,
    getUserBoard,
    getAdminBoard
}

export default userService ;