import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ReactComponent as ElliotSmithLogo } from "../media/elliot_smith_logo_large.svg";
import { Redirect } from "react-router";
import Status from "../components/Status.js";

const Login = (props) => {
  const history = useHistory();

  const [localEmail, setLocalEmail] = useState("");
  const [localPass, setLocalPass] = useState("");
  const [serverResponse, setServerResponse] = useState("default");

  const handleEmailChange = (e) => {
    setLocalEmail(e.target.value);
  };

  const handlePassChange = (e) => {
    setLocalPass(e.target.value);
  };

  const checkError = () => {
    switch (serverResponse) {
      case "login-failed":
        console.log("am i working");
        return (
          <div id="invalidPassBox">
            <p>Invalid password</p>
          </div>
        );
        break;
      case "email-not-found":
        return (
          <div id="emailNotFoundBox">
            <p>Email not found</p>
          </div>
        );
      default:
        return <div></div>;
    }
  };

  const redBorder = () => {
    if (serverResponse === "default") {
      return { border: "0px" };
    } else {
      return { border: "2px solid #e35335" };
    }
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
      .then((data) => {
        profile.accessToken = data.accessToken;
        profile.userID = data.userID;
        setServerResponse(data.success);
        if (data.success === "login-success") {
          props.login(profile);
          props.setServerResponse(data.success);
          setLocalEmail("");
          setLocalPass("");
        }
      });

    const getOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    };
    await fetch(
      `https://reach-server.vercel.app/playlists/getPlaylists/${profile.userID}`,
      getOptions
    )
      .then((response) => response.json())
      .then((data) => (profile.playlists = data));

    await props.getPlaylists(profile.playlists);
  };

  return (
    <div id="loginContainer">
      <Link to="/Home" id="homeLink">
        <ElliotSmithLogo
          id="homeLogoCreatAccount"
          style={{ width: "350px", height: "70px" }}
        />
      </Link>
      <form
        id="loginForm"
        onSubmit={(e) => {
          submitHandler(e, props);
        }}
      >
        {checkError()}
        <div id="loginInputsContainer">
          <label htmlFor="email">Enter Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => {
              handleEmailChange(e);
            }}
            style={redBorder()}
            value={localEmail}
          />

          <label htmlFor="pass">Enter Password</label>
          <input
            type="password"
            placeholder="Password"
            name="pass"
            onChange={(e) => {
              handlePassChange(e);
            }}
            value={localPass}
            style={redBorder()}
          />
          <Link to="/reset" id="resetLink">
            Forgot your password?
          </Link>
        </div>

        <button type="submit" id="submitLogin">
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
