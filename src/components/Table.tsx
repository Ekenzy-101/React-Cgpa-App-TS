import React from "react";
import { Table } from "react-bootstrap";

import TableBody from "./TableBody";
import TableHeader from "./TableHeader";
import NoData from "./NoData";
import { useAppContext } from "../Context";

const CustomTable: React.FC = () => {
  const { sortedCourses } = useAppContext();
  if (!sortedCourses.length) return <NoData />;
  return (
    <Table striped hover responsive>
      <TableHeader />
      <TableBody />
    </Table>
  );
};

export default CustomTable;
