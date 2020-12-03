import React from "react";
import { useAppContext } from "../Context";
import { Column } from "../types/course";

const TableHeader = () => {
  const { columns, sortColumn, handleSort } = useAppContext();

  const raiseSort = (path: string) => {
    const newSortColumn = { ...sortColumn };
    if (newSortColumn.path === path)
      newSortColumn.order = newSortColumn.order === "asc" ? "desc" : "asc";
    else {
      newSortColumn.path = path;
      newSortColumn.order = "asc";
    }
    handleSort(newSortColumn);
  };

  const renderSortIcon = (column: Column) => {
    if (column.path !== sortColumn.path) return null;
    if (sortColumn.order === "asc") return <i className="fas fa-sort-up"></i>;
    return <i className="fas fa-sort-down"></i>;
  };

  return (
    <thead>
      <tr>
        {columns.map((column) => (
          <th
            key={column.path || column.key}
            onClick={column.path ? () => raiseSort(column.path!) : undefined}
            className="clickable"
          >
            {column.label} {renderSortIcon(column)}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default TableHeader;
