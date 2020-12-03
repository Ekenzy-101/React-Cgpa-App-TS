import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Form } from "react-bootstrap";
import { useHistory, useParams } from "react-router-dom";
import { toast } from "react-toastify";

import useForm from "../hooks/useForm";
import Loading from "../components/shared/Loading";
import { initialValues } from "../types/form";
import { fetchCourse, saveCourse } from "../services/courseService";
import { TO_HOME } from "../utils/constant";
import { levels, semesters, units } from "../utils/data";
import {
  validateCode,
  validateScore,
  validateTitle,
} from "../utils/validation";
import NotFound from "./NotFound";

const obj: initialValues = {
  title: "",
  code: "",
  score: "",
  semester: "First",
  unit: "1",
  level: "100",
};

const CourseForm: React.FC = () => {
  // - State
  const [state, setState] = useState<"loading" | "not-found" | "initial">(
    "loading"
  );

  // - Other Hooks

  const populateCourse = useRef<() => Promise<void>>();

  const params = useParams() as { id: string };

  const history = useHistory();

  const {
    renderInput,
    renderButton,
    renderSelect,
    setFormData,
    setFormErrors,
    setFormState,
    formData,
  } = useForm(obj, { title: "", code: "", score: "" });

  populateCourse.current = async () => {
    try {
      if (params.id !== "add") {
        const { data } = (await fetchCourse(params.id)) as {
          data: initialValues;
        };
        setFormData(data);
        setFormErrors({});
      }
      setState("initial");
    } catch (err) {
      setState("not-found");
    }
  };

  // - Effect Hooks

  useEffect(() => {
    populateCourse.current?.();
  }, []);

  // - Event Handling

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFormState("submitted");

    try {
      await saveCourse({
        ...formData,
        score: parseInt(formData.score as string),
        unit: parseInt(formData.unit as string),
      });
      history.push(TO_HOME);
    } catch (error) {
      toast.error("An Unexpected Error Occured");
    }
  };

  // - JSX

  if (state === "loading") return <Loading />;

  if (state === "not-found") return <NotFound />;

  return (
    <Container className="course-container" fluid>
      <Col xs={11} sm={9} md={6} lg={5} className="mx-auto mt-5">
        <Form onSubmit={(e) => handleSubmit(e)}>
          {renderInput("title", "Course Title", validateTitle)}
          {renderInput("code", "Course Code", validateCode)}
          {renderInput("score", "Score", validateScore)}
          {renderSelect("unit", "Unit", units)}
          {renderSelect("level", "Level", levels)}
          {renderSelect("semester", "Semester", semesters)}
          {renderButton("SAVE")}
        </Form>
      </Col>
    </Container>
  );
};

export default CourseForm;
