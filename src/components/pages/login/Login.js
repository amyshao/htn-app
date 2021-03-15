import React, { useState } from "react";
import "./Login.css";
import { useHistory, useLocation } from "react-router-dom";
import useIsLoggedIn from "../../../hooks/login";

const Login = () => {
  const [formValid, setFormValid] = useState(true);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const { isLoggedIn, setIsLoggedIn } = useIsLoggedIn();

  const history = useHistory();
  const { state: { referrer } = {} } = useLocation();

  // for now have hardcoded login details
  const tempAccount = {
    email: "a",
    password: "a",
  };

  const login = (email, password) => {
    return email === tempAccount.email && password === tempAccount.password;
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (login(email, password)) {
      setIsLoggedIn(true);
      history.push(referrer || "/events");
      // temp solution without using redux
      window.location.reload();
    } else {
      setIsLoggedIn(false);
      setFormValid(false);
    }
  };

  return (
    <React.Fragment>
      <div className="login-container">
        <h1>Login</h1>
        {referrer && <h2>Please login to access this page.</h2>}
        <form onSubmit={onSubmit}>
          <div className="login-form">
            <div className="login-fields">
              <label>
                <input
                  id="email"
                  type="text"
                  placeholder="Your email here"
                  onChange={(e) => setEmail(e.target.value)}
                />
              </label>
              <label>
                <input
                  id="password"
                  type="text"
                  placeholder="Your password here"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </label>
              {!formValid && (
                <div className="error-message">
                  <span>Invalid Email or Password. Please try again.</span>
                </div>
              )}
            </div>
            <button onClick={onSubmit}>Submit</button>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Login;
