import React from "react";
import { Badge, Form } from "react-bootstrap";

interface Props {
  value: string;
  label: string;
}

const Score: React.FC<Props> = ({ value, label }) => {
  return (
    <Form.Group>
      <Form.Label>{label}</Form.Label>
      <h2>
        <Badge pill variant="primary">
          {value}
        </Badge>
      </h2>
    </Form.Group>
  );
};

export default Score;
