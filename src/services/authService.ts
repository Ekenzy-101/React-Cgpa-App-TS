import jwtDecode from "jwt-decode";

import { TOKEN_KEY } from "../utils/constant";
import { User } from "../types/user";
import { inputValue } from "../types/form";
import http from "./httpService";

export const getCurrentUser = () => {
  const jwt = localStorage.getItem(TOKEN_KEY);
  if (jwt) {
    const user = jwtDecode(jwt) as User;
    return user;
  }
  return null;
};

export const login = async (email: inputValue, password: inputValue) => {
  const { data: jwt } = await http.post("/auth", { email, password });
  localStorage.setItem(TOKEN_KEY, jwt);
};

export const logout = () => {
  localStorage.removeItem(TOKEN_KEY);
};

export const loginWithJwt = (jwt: string) => {
  localStorage.setItem(TOKEN_KEY, jwt);
};
