import React from "react";
import { Nav, Navbar } from "react-bootstrap";
import { Link, useHistory } from "react-router-dom";

import { TO_HOME, TO_LOGIN, TO_NEW_COURSE } from "../utils/constant";
import { useAppContext } from "../Context";
import { logout } from "../services/authService";

const NavBar: React.FC = () => {
  // - Other Hooks

  const { user } = useAppContext();

  const history = useHistory();

  // - Event Handlers

  const handleLogOut = () => {
    logout();
    return history.push(TO_LOGIN);
  };

  return (
    <Navbar
      collapseOnSelect
      expand="lg"
      sticky="top"
      variant="light"
      bg="light"
    >
      <Link to={TO_HOME} className="navbar-brand mr-5">
        CGPA APP
      </Link>
      <Navbar.Toggle aria-controls="responsive-navbar-nav" />
      <Navbar.Collapse id="responsive-navbar-nav">
        <Nav className="mr-auto d-flex w-50 justify-content-between ">
          <Link to={TO_NEW_COURSE} className="nav-link">
            NEW COURSE
          </Link>
          <a
            onClick={handleLogOut}
            style={{ cursor: "pointer" }}
            className="nav-link mr-5"
          >
            LOGOUT
          </a>
          <Nav.Link className="nav-link text-dark">
            Welcome {user?.firstname}
          </Nav.Link>
        </Nav>
        <Nav></Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavBar;
