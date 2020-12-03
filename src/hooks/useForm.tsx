import React, { useEffect, useState } from "react";
import { Alert, Button, Form, Spinner } from "react-bootstrap";
import cx from "classnames";

import {
  inputName,
  initialValues,
  validateFunction,
  formState,
} from "../types/form";

const useForm = (initialData: initialValues, initialErrors: initialValues) => {
  // - State Hooks

  const [formData, setFormData] = useState(initialData);
  const [formErrors, setFormErrors] = useState(initialErrors);
  const [formState, setFormState] = useState<formState>("initial");
  const [alertMessage, setAlertMessage] = useState("");

  // - Effect Hooks

  useEffect(() => {
    if (Object.keys(formErrors).length) {
      setFormState("form-error");
    } else {
      setFormState("noerror");
    }
  }, [formErrors]);

  // - Event Handlers

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    validate?: validateFunction
  ) => {
    const errors = { ...formErrors };
    const data = { ...formData };
    const { name, value } = e.target;
    const inputName = name as inputName;

    if (validate) {
      data[inputName] = value;
      const error = validate(data[inputName]);
      if (error) errors[inputName] = error;
      else {
        delete errors[inputName];
      }
    } else {
      data[inputName] = value;
    }

    setFormData(data);
    setFormErrors(errors);
  };

  // - Custom Logic

  const isDisabled = () => {
    if (formState === "submitted" || formState === "form-error") return true;
    return false;
  };

  const renderButton = (label: string) => {
    return (
      <Form.Group className="mt-5">
        <Button block type="submit" disabled={isDisabled()}>
          {formState === "submitted" ? (
            <Spinner
              animation="border"
              variant="light"
              className="small-spinner"
            />
          ) : (
            label
          )}
        </Button>
      </Form.Group>
    );
  };

  const renderInput = (
    name: inputName,
    label: string,
    validate?: validateFunction,
    placeholder?: string,
    type?: string
  ) => {
    return (
      <Form.Group className="mt-3">
        <Form.Label htmlFor={name}>{label}</Form.Label>
        <Form.Control
          id={name}
          name={name}
          className={cx(
            { "is-valid": formErrors[name] === undefined },
            { "is-invalid": formErrors[name] }
          )}
          placeholder={placeholder}
          type={type}
          value={formData[name]}
          onChange={(e) =>
            handleChange(e as React.ChangeEvent<HTMLInputElement>, validate)
          }
        />
        {formErrors[name] ? (
          <small className="invalid-feedback d-block w-100">
            {formErrors[name]}
          </small>
        ) : null}
      </Form.Group>
    );
  };

  const renderAlert = () => {
    if (alertMessage) {
      return (
        <Alert
          variant={formState === "success" ? "success" : "danger"}
          dismissible
          onClose={() => setAlertMessage("")}
        >
          {alertMessage}
        </Alert>
      );
    }
  };

  const renderSelect = (name: inputName, label: string, options: any[]) => {
    return (
      <Form.Group>
        <Form.Label htmlFor={name}>{label}</Form.Label>
        <Form.Control
          as="select"
          id={name}
          name={name}
          value={formData[name]}
          onChange={(e) =>
            handleChange(e as React.ChangeEvent<HTMLInputElement>)
          }
          className="mb-2"
        >
          {options.map((option, index) => (
            <option key={index} value={option}>
              {option}
            </option>
          ))}
        </Form.Control>
      </Form.Group>
    );
  };

  return {
    formData,
    renderAlert,
    renderButton,
    renderInput,
    renderSelect,
    setFormData,
    setFormState,
    setFormErrors,
    setAlertMessage,
  };
};

export default useForm;
