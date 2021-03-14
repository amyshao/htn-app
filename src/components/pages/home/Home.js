import React from "react";
import classNames from "classnames";
import styles from "./Home.css";

const Home = () => (
  <React.Fragment>
    <div className="home-page">
      <h1 className={classNames("text-center", "text-md-left", styles.header)}>
        Welcome to Hack the North 2021
      </h1>
    </div>
  </React.Fragment>
);

export default Home;
