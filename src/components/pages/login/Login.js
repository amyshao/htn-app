import React from "react";
import classNames from "classnames";
import styles from "./Login.css";

const Login = () => (
  <React.Fragment>
    <div className="login-page">
      <h1 className={classNames("text-center", "text-md-left", styles.header)}>
        Login here
      </h1>
    </div>
  </React.Fragment>
);

export default Login;
