export interface formOption {
  value: inputValue;
  label: string;
}

export type formState =
  | "submitted"
  | "alert-error"
  | "success"
  | "initial"
  | "noerror"
  | "form-error";

export type inputName =
  | "email"
  | "password"
  | "firstname"
  | "lastname"
  | "title"
  | "score"
  | "unit"
  | "code"
  | "semester"
  | "level";

export type inputValue = string | number | string[] | undefined;

export interface initialValues {
  email?: inputValue;
  password?: inputValue;
  firstname?: inputValue;
  lastname?: inputValue;
  title?: inputValue;
  score?: inputValue;
  unit?: inputValue;
  code?: inputValue;
  level?: inputValue;
  semester?: inputValue;
  _id?: string;
}

export type validateFunction = (value: inputValue) => string | undefined;
