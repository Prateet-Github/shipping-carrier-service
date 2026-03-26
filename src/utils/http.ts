import axios from "axios";

export const httpClient = axios.create({
  timeout: 5000,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.response.use(
  (res) => res,
  (err) => {
    return Promise.reject({
      message: err.response?.data || err.message,
      status: err.response?.status,
    });
  }
);