import React from "react";
import { Col, Container, Form } from "react-bootstrap";
import { Link, useHistory, useLocation } from "react-router-dom";

import useForm from "../hooks/useForm";
import { login } from "../services/authService";
import { TO_HOME, TO_SIGNUP } from "../utils/constant";
import { validateEmail, validatePassword } from "../utils/validation";

const obj = {
  email: "",
  password: "",
};

const Login: React.FC = () => {
  // - Other Hooks
  const history = useHistory();

  const { state } = useLocation();

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
    setFormState("submitted");
    try {
      await login(formData.email, formData.password);
      state ? history.push(state as string) : history.push(TO_HOME);
    } catch (ex) {
      setFormState("alert-error");
      setAlertMessage(ex.response.data);
    }
  };

  // - JSX

  return (
    <Container className="signup-container px-0" fluid>
      <Col xs={11} sm={9} md={6} lg={5} className="mx-auto mt-5">
        {renderAlert()}
        <h3 className="text-center">Log In</h3>
        <Form onSubmit={handleSubmit}>
          {renderInput("email", "Email", validateEmail, "johndoe@example.com")}
          {renderInput(
            "password",
            "Password",
            validatePassword,
            "Greater than 5 characters",
            "password"
          )}
          {renderButton("LOGIN")}
          <Form.Group>
            <p className="text-center">
              Don't Have An Account? <Link to={TO_SIGNUP}>Sign Up</Link>
            </p>
          </Form.Group>
        </Form>
      </Col>
    </Container>
  );
};

export default Login;
