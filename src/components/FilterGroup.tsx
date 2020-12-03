import React from "react";

import Score from "./Score";
import SearchBox from "./SearchBox";
import Select from "./Select";
import { useAppContext } from "../Context";
import { levels } from "../utils/data";

const FilterGroup = () => {
  const { level, handleChange, searchQuery, sgpa, cgpa } = useAppContext();

  return (
    <div className="filter-container px-3">
      <Select
        options={levels}
        label="Choose Level"
        name="level"
        value={level}
        onChange={handleChange}
      />
      <SearchBox
        label="Search"
        name="searchQuery"
        value={searchQuery}
        onChange={handleChange}
      />
      <div className="d-flex justify-content-between">
        <Score value={sgpa} label={"SGPA"} />
        <Score value={cgpa} label={"CGPA"} />
      </div>
    </div>
  );
};

export default FilterGroup;
