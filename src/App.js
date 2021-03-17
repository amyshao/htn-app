import React from "react";
import { Route, Switch, useHistory } from "react-router-dom";
import "./App.css";
import NavBar from './components/NavBar.js';
import Home from './components/pages/home/Home';
import Login from './components/pages/login/Login';
import Events from './components/pages/event/Events';
import Event from './components/pages/event/Event';
import useIsLoggedIn from "./hooks/login";
import { createClient, Provider } from 'urql';


const App = () => {
  const history = useHistory();
  const {isLoggedIn, setIsLoggedIn} = useIsLoggedIn();

  // set up urql client 
  const client = createClient({
    url: "https://api.hackthenorth.com/v3/graphql",
  });

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
      <main className="body">
      <Provider value={client}>
        <Switch>
          <Route path="/" exact>
            <Home />
          </Route>
          <Route path="/login">
            <Login setParentState={setIsLoggedIn}/>
          </Route>
          <Route path="/events" exact>
            <Events />
          </Route>
          <Route
            path="/events/:id"
            render={(props) => (
              <Event eventId={props.match.params.id} />
            )}
          />
        </Switch>
      </Provider>
        
      </main>
    </div>
  );
};

export default App;
