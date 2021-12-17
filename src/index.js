import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";

import { Route } from "react-router";
import Navigation from "./containers/Navigation.js";
import Header from "./containers/Header.js";
import Footer from "./containers/Footer.js";

import CreateAccount from "./containers/CreateAccount.js";
import Router from "./Router.js";
import store from "./redux/store.js";
import { saveState } from "./localStorage";
import App from "./containers/App.js";
import Login from "./containers/Login.js";
import Status from "./containers/Status.js";
import DeletePlaylist from "./containers/DeletePlaylist";

import reportWebVitals from "./reportWebVitals";

const Main = () => {
  store.subscribe(() => {
    saveState({
      /* example state */
      profile: store.getState().profile,
      currentSong: store.getState().currentSong,
      songHistory: store.getState().songHistory,
      playlists: store.getState().playlists,
    });
  });

  return (
    <Provider store={store}>
      <BrowserRouter id="pageWrap">
        <Route path="/login" component={Login} />
        <Route path="/CreateAccount" component={CreateAccount} />
        <Status />
        <div>
          <section id="mainWrap">
            <DeletePlaylist />
            <Navigation />
            <div id="headerBodyCont">
              <Header />
              <Router />
            </div>
          </section>
          <Footer />
        </div>
      </BrowserRouter>
    </Provider>
  );
};

ReactDOM.render(<Main />, document.getElementById("root"));

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
