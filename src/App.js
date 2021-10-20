import logo from "./logo.svg";
import Navigation from "./components/Navigation.js";
import Header from "./containers/Header.js";
import Footer from "./components/Footer.js";
import Login from "./containers/Login.js";
import Router from "./Router.js";

import "./App.css";

const App = (props) => {
  if (props.loggedIn) {
    return <div></div>;
  } else {
    return <Login />;
  }
};

export default App;
