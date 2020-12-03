import React from "react";
import { Form } from "react-bootstrap";

interface Props {
  name: string;
  value: string;
  label: string;
  options: any[];
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const Select: React.FC<Props> = ({ name, value, label, options, ...rest }) => {
  return (
    <Form.Group>
      <Form.Label htmlFor={name}>{label}</Form.Label>
      <Form.Control
        as="select"
        {...rest}
        id={name}
        name={name}
        value={value}
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

export default Select;
