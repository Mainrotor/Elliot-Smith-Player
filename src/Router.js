import React from "react";
import { Switch, Route } from "react-router";

import Body from "./components/Body.js";
import Home from "./components/Home.js";
import Reset from "./components/Reset.js";
import Search from "./components/Search.js";
import CreateAccount from "./components/CreateAccount.js";

import App from "./App.js";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={Body} />
      <Route path="/Home" component={Home} />
      <Route path="/Reset" component={Reset} />
      <Route path="/Search" component={Search} />
    </Switch>
  );
};

export default Router;
