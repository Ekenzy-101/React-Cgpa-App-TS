import React, { createContext, useContext, useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import _ from "lodash";

import Loading from "./components/shared/Loading";
import { getCurrentUser } from "./services/authService";
import { deleteCourse, fetchCourses } from "./services/courseService";
import {
  SortColumn,
  Context,
  ContextState,
  Course,
  Column,
} from "./types/course";
import { TO_COURSES, TO_LOGIN } from "./utils/constant";
import { calcuteGPA } from "./utils/helpers";
import { Button } from "react-bootstrap";

const AppContext = createContext<Context | null>(null);

AppContext.displayName = "AppContext";

const AppProvider: React.FC = (props) => {
  // - State Hooks

  const [state, setState] = useState<ContextState>({
    courses: [],
    user: null,
    loading: true,
    level: "100",
    semester: "First",
    searchQuery: "",
    sortColumn: { path: "title", order: "asc" },
    sortedCourses: [],
    cgpa: "0.00",
    sgpa: "0.00",
    columns: [],
  });

  // - Other Hooks

  const history = useHistory();

  // - Effect Hooks

  useEffect(() => {
    const user = getCurrentUser();

    if (!user) {
      return history.replace(TO_LOGIN);
    }

    fetchCourses()
      .then(({ data }) => {
        setState({
          ...state,
          courses: data as Course[],
          loading: false,
          user,
        });
      })
      .catch((err) => {
        console.log(err);
        toast.error(
          "We're having issues loading your courses. Please Try Again"
        );
        setState({ ...state, loading: false });
      });
  }, []);

  useEffect(() => {
    const { courses, level, semester, sortColumn, searchQuery } = state;

    let filtered = courses;
    // Filter Then Sort
    if (searchQuery)
      filtered = filtered.filter((course) =>
        course.title.toLowerCase().includes(searchQuery.toLowerCase())
      );
    filtered = filtered.filter(
      (course) => course.level === level && course.semester === semester
    );
    const sorted = _.orderBy(filtered, [sortColumn.path], [sortColumn.order]);
    // Calculate SGPA and CGPA
    const cgpa = calcuteGPA(courses);
    const sgpa = calcuteGPA(sorted);

    setState({ ...state, sortedCourses: sorted, cgpa, sgpa });
  }, [
    state.level,
    state.semester,
    state.sortColumn,
    state.searchQuery,
    state.courses,
  ]);

  // - Event Handlers

  const handleSort = (sortColumn: SortColumn) => {
    setState({ ...state, sortColumn });
  };

  const handleSemesterSelect = (semester: string) => {
    setState({ ...state, semester });
  };

  const handleChange = ({
    target: { name, value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, [name]: value });
  };

  const handleDelete = async (course: Course) => {
    setState({ ...state, loading: true });

    const courses = [...state.courses];
    const filtered = courses.filter((c) => c._id != course._id);

    try {
      await deleteCourse(course);
      setState({ ...state, courses: filtered });
      toast.success("Deleted Successfully");
    } catch (error) {
      setState({ ...state, courses });
      toast.error("Could Not Delete Course");
    } finally {
      setState({ ...state, loading: false });
    }
  };

  // - JSX

  if (state.loading) return <Loading />;

  return (
    <AppContext.Provider
      value={{
        ...state,
        handleChange,
        handleSemesterSelect,
        handleSort,
        handleDelete,
      }}
    >
      {props.children}
    </AppContext.Provider>
  );
};

const useAppContext = () => {
  const context = useContext(AppContext) as Context;
  const { handleDelete } = context;
  const columns: Column[] = [
    { key: "no", label: "S/N" },
    { path: "title", label: "Title" },
    { path: "code", label: "Code" },
    { path: "score", label: "Score" },
    { path: "grade", label: "Grade" },
    { path: "unit", label: "Unit" },
    { path: "weightedScore", label: "W.S." },
    {
      key: "update",
      content: (course: Course) => (
        <Link to={`${TO_COURSES}/${course._id}`} className="btn btn-primary">
          <i className="fas fa-pencil-alt"></i>
        </Link>
      ),
    },
    {
      key: "delete",
      content: (course: Course) => (
        <Button variant="danger" onClick={() => handleDelete(course)}>
          <i className="fas fa-trash"></i>
        </Button>
      ),
    },
  ];
  return { ...context, columns };
};

export { AppProvider, useAppContext };
