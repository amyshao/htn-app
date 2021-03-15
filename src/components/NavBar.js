import React from "react";
import { Link } from "react-router-dom";
import "./NavBar.css";

const NavBar = ({ routes }) => (
  <nav>
    <div className="nav-container">
      {routes.map(({ to, label, onClick }) => (
        <div key={label}>
          {to ? (
            <Link className="nav-links" to={to}>{label}</Link>
          ) : (
            <button className="nav-button" onClick={onClick}>{label}</button>
          )}
        </div>
      ))}
    </div>
  </nav>
);

export default NavBar;
