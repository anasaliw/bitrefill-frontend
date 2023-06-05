import { TokenOutlined } from "@mui/icons-material";
import axios from "axios";

const BASE_URL = "https://gbs-ecomm.vercel.app/";
// let accessToken;
// let accessToken = localStorage.getItem("token");
// let accessToken2 = sessionStorage.getItem("authToken");

// setInterval(() => {
// }, 1000);

// console.log("AuthToken", accessToken);
export const instance = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
    Authorization: `Bearer ${
      localStorage.getItem("token") || sessionStorage.getItem("authToken")
    }`,
  },
});
export const instanceGet = (endpoint) => {
  return axios.get(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${
        localStorage.getItem("token") || sessionStorage.getItem("authToken")
      }`,
    },
  });
};
export const instancePost = (endpoint, data) => {
  return axios.post(`${BASE_URL}${endpoint}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
export const instancePut = (endpoint, data) => {
  console.log("checkData", data);
  return axios.put(`${BASE_URL}${endpoint}`, data, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
export const instanceDelete = (endpoint) => {
  console.log("checkData", endpoint);
  return axios.delete(`${BASE_URL}${endpoint}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
  });
};
export const instanceNonAuth = axios.create({
  withCredentials: true,
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
