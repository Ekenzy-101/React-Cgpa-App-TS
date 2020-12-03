import React, { useEffect, useState, createContext } from "react";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";

import { AppProvider } from "../Context";
import TabGroup from "../components/TabGroup";
import FilterGroup from "../components/FilterGroup";
import { TO_NEW_COURSE } from "../utils/constant";
import NavBar from "../components/NavBar";

const Home = () => {
  return (
    <AppProvider>
      <NavBar />
      <Container fluid className="home-container pt-5">
        <FilterGroup />
        <TabGroup />
        <Link
          to={TO_NEW_COURSE}
          className="btn-primary btn-new rounded-circle btn-lg"
        >
          <i className="fas fa-plus"></i>
        </Link>
      </Container>
    </AppProvider>
  );
};

export default Home;
