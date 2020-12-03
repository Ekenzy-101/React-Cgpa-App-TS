import { AxiosResponse } from "axios";
import { initialValues } from "../types/form";
import http from "./httpService";

export const register: (data: initialValues) => Promise<AxiosResponse<any>> = ({
  email,
  password,
  firstname,
  lastname,
}) => {
  return http.post("/users", {
    email,
    password,
    firstname,
    lastname,
  });
};
