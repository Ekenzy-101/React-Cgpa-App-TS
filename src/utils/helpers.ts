import { Course } from "../types/course";

export const calcuteGPA = (courses: Course[]) => {
  let totalUnits = 0;
  let totalWeightedScore = 0;
  for (let course of courses) {
    totalUnits += course.unit;
    totalWeightedScore += course.weightedScore;
  }
  let result = totalWeightedScore / totalUnits;
  if (!result) result = 0;
  let gpa = ((result * 100) / 100).toFixed(2);
  return gpa;
};
