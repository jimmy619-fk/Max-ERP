import axios from "axios";

// am defining the base URL for the API just for test in production we will keep it in .env file
const BASE_URL = "http://localhost:5000/api";

export const apiUtils = {
  handleError: (error) => {
    if (error.response) {
      return {
        type: "server",
        message: error.response.data?.error || "Server Error",
        errors: error.response.data?.errors || null,
      };
    }
    return {
      type: "network",
      message: error.message || "Network Error",
    };
  },
};

export const employeeAPI = {
  getAll: () => axios.get(`${BASE_URL}/employees`),
};

export const shiftAPI = {
  getAll: () => axios.get(`${BASE_URL}/shifts`),
  create: (data) => axios.post(`${BASE_URL}/shifts`, data),
};
