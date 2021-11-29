import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Redirect } from "react-router";
import Status from '../components/Status.js';

const Login = (props) => {
  const history = useHistory();

  const [localEmail, setLocalEmail] = useState("");
  const [localPass, setLocalPass] = useState("");

  const handleEmailChange = (e) => {
    setLocalEmail(e.target.value);
  };

  const handlePassChange = (e) => {
    setLocalPass(e.target.value);
  };

  const submitHandler = async (e, props) => {
    e.preventDefault();
    let profile = {
      email: localEmail,
      pass: localPass,
      userID: 0,
      accessToken: "",
      playlists: [],
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify(profile),
    };

    await fetch("https://reach-server.vercel.app/users/login", requestOptions)
      .then((response) => response.json())
      .then((data) => [
        (profile.accessToken = data.accessToken),
        (profile.userID = data.userID),
        (props.setServerResponse(data.success)),
        (props.login(profile))
      ]);

    const getOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    };
    console.log(props.profile)
    await fetch(`https://reach-server.vercel.app/playlists/getPlaylists/${profile.userID}`, getOptions)
      .then((response) => response.json())
      .then((data) => profile.playlists = data);

    await props.getPlaylists(profile.playlists);

    setLocalEmail("");
    setLocalPass("");
  };

  return (
    <div id="loginContainer">
      <Link to="/Home" id="homeLink">
        Elliot Smith Player
      </Link>
      <form id="loginForm"
        onSubmit={(e) => {
          submitHandler(e, props);
        }}
      >
        <div id="loginInputsContainer">
          <label htmlFor="email">
            <b>Enter Email</b>
          </label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => {
              handleEmailChange(e);
            }}
            value={localEmail}
          />

          <label htmlFor="pass">
            <b>Enter Password</b>
          </label>
          <input
            type="password"
            placeholder="Password"
            name="pass"
            onChange={(e) => {
              handlePassChange(e);
            }}
            value={localPass}
          />
          <Link to="/reset" id="resetLink">
            Forgot your password?
          </Link>
        </div>

        <button type="submit" id="submitLogin">
          <b>Login</b>
        </button>
      </form>
    </div>
  );
};

export default Login;
