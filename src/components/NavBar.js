import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ routes }) => (
  <nav>
    <div className="nav-container">
      {routes.map(({ to, label }) => (
        <Link className="nav-links" to={to}>{label}</Link>
      ))}
    </div>
  </nav>
);

export default NavBar;
