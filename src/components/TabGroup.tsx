import React, { useContext } from "react";
import { Tab, Tabs } from "react-bootstrap";

import CustomTable from "./Table";
import { useAppContext } from "../Context";
import { semesters } from "../utils/data";

const TabGroup = () => {
  const { handleSemesterSelect } = useAppContext();

  return (
    <div className="tab-container">
      <Tabs
        defaultActiveKey="First"
        id="uncontrolled-tab-example"
        onSelect={(key) => handleSemesterSelect(key as string)}
      >
        {semesters.map((value) => (
          <Tab key={value} eventKey={value} title={`${value} Semester`}>
            <div>
              <CustomTable />
            </div>
          </Tab>
        ))}
      </Tabs>
    </div>
  );
};

export default TabGroup;
