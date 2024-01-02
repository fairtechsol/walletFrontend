import axios from "axios";
import { toast } from "react-toastify";

const toastOptions = {
  autoClose: 1500,
  hideProgressBar: false,
  closeOnClick: true,
  pauseOnHover: true,
};

const PORT = "5050";

// PRODUCTION:
// let DEVELOPMENT = `http://localhost:${PORT}`;
let TESTING = `http://3.89.232.255:${PORT}`;

const service = axios.create({
  // baseURL: DEVELOPMENT,
  baseURL: TESTING,
});

service.defaults.timeout = 100000;

service.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json";

    const authToken = sessionStorage.getItem("userToken");
    config.headers.Authorization = `Bearer ${authToken}`;
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

service.interceptors.response.use(
  (response) => {
    if (response.data?.message) {
      toast.success(response.data?.message, toastOptions);
    }
    return response.data;
  },
  (error) => {
    if (error.response.status === 500) {
      toast.error(error.response.data.message, toastOptions);
    } else if (error.response.status === 403) {
      toast.error(error.response.data.message, toastOptions);
    } else if (error.response.status === 404) {
      toast.error(error.response.data.message, toastOptions);
    } else if (error.response.status === 400) {
      toast.error(error.response.data.message, toastOptions);
    } else if (error.response.status === 409) {
      toast.error(error.response.data.message, toastOptions);
    } else if (error.response.status === 401) {
      toast.error(error.response.data.message, toastOptions);
      window.location.replace("/wallet/login");
      sessionStorage.clear();
    }

    return Promise.reject(error);
  }
);

export default service;
