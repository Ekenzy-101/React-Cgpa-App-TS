import React from "react";
import _ from "lodash";

import { useAppContext } from "../Context";
import { Column, Course } from "../types/course";

const TableBody = () => {
  const { sortedCourses, columns } = useAppContext();
  const courses = sortedCourses as Course[];
  const renderCell = (course: Course, column: Column) => {
    if (column.content) return column.content(course);
    if (column.label === "S/N") {
      const index = sortedCourses.findIndex((el) => el._id === course._id);
      return index + 1;
    }
    return _.get(course, column.path!);
  };

  const createKey = (course: Course, column: Column) => {
    return course._id + (column.path || column.key);
  };

  return (
    <tbody>
      {courses.map((item: any) => {
        return (
          <tr key={item._id}>
            {columns.map((column) => (
              <td key={createKey(item, column)}>{renderCell(item, column)}</td>
            ))}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableBody;
