import http from "./httpService";
import { initialValues } from "../types/form";
const apiEndPoint = `courses`;

export const fetchCourses = () => {
  return http.get(`${apiEndPoint}/me`);
};

export const fetchCourse = (id: string) => {
  return http.get(`${apiEndPoint}/${id}`);
};

export const saveCourse = (course: initialValues) => {
  if (course._id) {
    let data = { ...course };
    delete data._id;
    return http.put(`${apiEndPoint}/${course._id}`, data);
  }
  return http.post(apiEndPoint, course);
};

export const deleteCourse = (course: { _id: string }) => {
  return http.delete(`${apiEndPoint}/${course._id}`);
};
