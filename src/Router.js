import React from "react";
import { Switch, Route } from "react-router";

import Body from "./components/Body.js";
import Home from "./containers/Home.js";
import Playlist from "./containers/Playlist.js";
import Reset from "./components/Reset.js";
import Search from "./containers/Search.js";
import CreateAccount from "./components/CreateAccount.js";
import Album from "./containers/Album.js";

import App from "./App.js";

const Router = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/Home" component={Home} />
      <Route path="/Reset" component={Reset} />
      <Route path="/Search" component={Search} />
      <Route exact path="/Playlist/:id/:userID" component={Playlist} />
      <Route exact path="/album/:albumID" component={Album} />
    </Switch>
  );
};

export default Router;
