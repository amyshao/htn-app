import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import NavBar from './components/NavBar.js';
import Home from './components/pages/home/Home';
import Login from './components/pages/login/Login';
import Events from './components/pages/event/Events';
import Event from './components/pages/event/Event';
import useIsLoggedIn from "./hooks/login";

const App = () => {
  const history = useHistory();
  const {isLoggedIn, setIsLoggedIn} = useIsLoggedIn();
  
  const navBarRoutes = [
    {
      label: "Home",
      to: "/",
    },
    {
      label: "Events",
      to: "/events",
    },
    isLoggedIn
      ? {
          label: "Logout",
          onClick: () => {
            setIsLoggedIn(false);
            history.push('/');
          },
        }
      : {
          label: "Login",
          to: "/login",
        },
  ];

  return (
    <div className="App">
      <NavBar routes={navBarRoutes} />
      <div className="body">
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/events">
            <Events />
          </Route>
          <Route
            path="/event/:id"
            render={(props) => (
              /* eslint-disable react/prop-types */
              <Event itemId={props.match.params.id} />
              /* eslint-enable react/prop-types */
            )}
          />
        </Switch>
      </div>
    </div>
  );
};

export default App;
