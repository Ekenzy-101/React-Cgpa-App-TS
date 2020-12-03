import { User } from "./user";

export interface Course {
  _id: string;
  title: string;
  code: string;
  level: string;
  semester: string;
  score: number;
  grade: string;
  unit: number;
  weightedScore: number;
}

export interface SortColumn {
  path: string;
  order: "asc" | "desc";
}

export interface Column {
  path?: string;
  label?: string;
  key?: string;
  content?: (course: Course) => JSX.Element;
}

export interface ContextState {
  courses: Course[] | [];
  columns: Column[] | [];
  user: User | null;
  level: string;
  loading: boolean;
  semester: string;
  searchQuery: string;
  sortColumn: SortColumn;
  cgpa: string;
  sgpa: string;
  sortedCourses: Course[] | [];
}

export interface ContextHandler {
  handleSemesterSelect: (semester: string) => void;
  handleSort: (sortColumn: SortColumn) => void;
  handleDelete: (course: Course) => void;
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export type Context = ContextHandler & ContextState;
