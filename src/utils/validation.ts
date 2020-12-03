import validator from "validator";
import { inputValue, validateFunction } from "../types/form";

export const validateEmail: validateFunction = (value: inputValue) => {
  const email = value as string;
  if (!validator.isEmail(email)) {
    return "Email is not valid";
  }
};
export const validateName: validateFunction = (value: inputValue) => {
  const name = value as string;
  if (validator.isEmpty(name)) {
    return "Field is required";
  }
  if (!validator.isLength(name, { max: 25 })) {
    return "Field should be between 25 characters";
  }
};
export const validatePassword: validateFunction = (value: inputValue) => {
  const password = value as string;
  if (!validator.isLength(password, { min: 5, max: 1000 })) {
    return "Password must contain at least 5 characters";
  }
};

export const validateTitle: validateFunction = (value: inputValue) => {
  const title = value as string;
  if (validator.isEmpty(title)) {
    return "Field is required";
  }
  if (!validator.isLength(title, { min: 5 })) {
    return "Field should be up to 5 characters";
  }
};

export const validateCode: validateFunction = (value: inputValue) => {
  const code = value as string;
  if (validator.isEmpty(code)) {
    return "Field is required";
  }
  if (!validator.isLength(code, { min: 6, max: 6 })) {
    return "Field should be 6 characters";
  }
};

export const validateUnit: validateFunction = (value: inputValue) => {
  const unit = value as string;
  if (validator.isEmpty(unit)) {
    return "Field is required";
  }
  if (!validator.isInt(unit, { min: 1, max: 6 })) {
    return "Field should be between 1 and 6";
  }
};

export const validateScore: validateFunction = (value: inputValue) => {
  const score = value as string;
  if (validator.isEmpty(score)) {
    return "Field is required";
  }
  if (!validator.isInt(score, { min: 0, max: 100 })) {
    return "Field should be between 0 and 100";
  }
};
