import React from "react";
import { Col, Container, Form } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import useForm from "../hooks/useForm";
import { loginWithJwt } from "../services/authService";
import { register } from "../services/userService";
import { TO_HOME, TO_LOGIN } from "../utils/constant";
import {
  validateEmail,
  validateName,
  validatePassword,
} from "../utils/validation";

const obj = {
  email: "",
  firstname: "",
  lastname: "",
  password: "",
};

const Signup: React.FC = () => {
  // - Other Hooks

  const history = useHistory();

  const {
    renderInput,
    renderButton,
    renderAlert,
    formData,
    setFormState,
    setAlertMessage,
  } = useForm(obj, obj);

  // - Event Handling

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const { headers } = await register(formData);
      loginWithJwt(headers["x-auth-token"]);
      history.push(TO_HOME);
    } catch (err) {
      setFormState("alert-error");
      setAlertMessage(err.response.data);
    }
  };

  // - JSX

  return (
    <Container className="signup-container px-0" fluid>
      <Col xs={11} sm={9} md={6} lg={5} className="mx-auto mt-5">
        {renderAlert()}
        <h3 className="text-center">Sign Up</h3>
        <Form onSubmit={(e) => handleSubmit(e)}>
          {renderInput("firstname", "Firstname", validateName, "John")}
          {renderInput("lastname", "Lastname", validateName, "Doe")}
          {renderInput("email", "Email", validateEmail, "johndoe@example.com")}
          {renderInput(
            "password",
            "Password",
            validatePassword,
            "Greater than 5 characters",
            "password"
          )}
          {renderButton("SIGN UP")}
          <Form.Group>
            <p className="text-center">
              Have An Account Already? <Link to={TO_LOGIN}>Login</Link>
            </p>
          </Form.Group>
        </Form>
      </Col>
    </Container>
  );
};

export default Signup;
