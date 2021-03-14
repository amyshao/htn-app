import React from "react";
import { Route, Switch } from "react-router-dom";
import "./App.css";
import NavBar from './components/NavBar.js';
import Home from './components/pages/home/Home';
import Login from './components/pages/login/Login';
import Events from './components/pages/event/Events';
import Event from './components/pages/event/Event';

const App = () => {
  const navBarRoutes = [
    {
      label: "Home",
      to: "/",
    },
    {
      label: "Events",
      to: "/events",
    },
    {
      label: "Login",
      to: "/login",
    },
  ];

  return (
    <div className="App">
      <NavBar routes={navBarRoutes} />
      <body>
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
      </body>
    </div>
  );
};

export default App;
