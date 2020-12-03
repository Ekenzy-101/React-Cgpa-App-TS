import axios from "axios";
import { TOKEN_KEY } from "../utils/constant";

axios.interceptors.request.use((config) => {
  config = {
    ...config,
    baseURL: process.env.REACT_APP_API_URL,
    headers: {
      "x-auth-token": localStorage.getItem(TOKEN_KEY),
    },
  };
  return config;
});

export default {
  get: axios.get,
  post: axios.post,
  put: axios.put,
  delete: axios.delete,
};
