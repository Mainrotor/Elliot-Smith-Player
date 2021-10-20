import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Header = (props) => {
  const checkLogIn = (props) => {
    if (props.loggedIn) {
      return (
        <button>
          <Link onClick={() => props.logout()}>Logout</Link>
        </button>
      );
    } else {
      return (
        <div>
          <button id="signUpButton">
            <Link to={"/CreateAccount"}>Sign up</Link>
          </button>
          <button id="loginButton">
            <Link to={"/login"}>Login</Link>
          </button>
        </div>
      );
    }
  };

  return (
    <header id="header">
      <div id="leftHead">
        <div>
          <h1>back</h1>
        </div>
        <div>
          <h1>forward</h1>
        </div>
      </div>
      <div id="rightHead">{checkLogIn(props)}</div>
    </header>
  );
};

export default Header;
