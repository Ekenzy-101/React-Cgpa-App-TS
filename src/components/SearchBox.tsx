import React from "react";
import { Form } from "react-bootstrap";

interface Props {
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  value: string;
  name: string;
  label: string;
}

const SearchBox: React.FC<Props> = ({ onChange, ...rest }) => {
  return (
    <Form.Group>
      <Form.Label>Search</Form.Label>
      <Form.Control
        placeholder="Search By Title..."
        {...rest}
        onChange={(e) => onChange(e as React.ChangeEvent<HTMLInputElement>)}
      />
    </Form.Group>
  );
};

export default SearchBox;
