import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";

const Header = (props) => {
  let history = useHistory();
  const checkLogIn = (props) => {
    if (props.loggedIn) {
      return (
        <button id="logOutButton" onClick={() => props.logout()}>
          <Link
            style={{
              color: "white",
              textDecoration: "none",
              fontWeight: "500",
            }}
          >
            Logout
          </Link>
        </button>
      );
    } else {
      return (
        <div>
          <button
            id="signUpButton"
            onClick={() => {
              history.push("/CreateAccount");
            }}
          >
            <Link
              to={"/CreateAccount"}
              style={{
                color: "white",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Sign up
            </Link>
          </button>
          <button
            id="loginButton"
            onClick={() => {
              history.push("/login");
            }}
          >
            <Link
              to={"/login"}
              style={{
                color: "#0c1736",
                textDecoration: "none",
                fontWeight: "500",
              }}
            >
              Login
            </Link>
          </button>
        </div>
      );
    }
  };

  return (
    <header id="header">
      <div id="leftHead"></div>
      <div id="rightHead">{checkLogIn(props)}</div>
    </header>
  );
};

export default Header;
