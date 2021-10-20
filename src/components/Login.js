import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Redirect } from "react-router";

const Login = (props) => {
  const history = useHistory();

  const [localEmail, setLocalEmail] = useState("");
  const [localPass, setLocalPass] = useState("");
  const [loginSuccess, setLoginSuccess] = useState(null);

  const handleEmailChange = (e) => {
    setLocalEmail(e.target.value);
  };

  const handlePassChange = (e) => {
    setLocalPass(e.target.value);
  };

  const loginSuccessChecker = () => {
    switch (loginSuccess){
      case false:
        return <div id="loginFail"><p>Your email or password is incorrect</p></div>
        break;
      case true:
        return <div id="loginSuccess"><p>Logging you in...</p></div>
      default:
        return <div></div>
        break;
  
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
      .then((data) => [
        (profile.accessToken = data.accessToken),
        (profile.userID = data.userID),
        (setLoginSuccess(data.success))
      ]);

    await loginSuccessChecker();

    props.login(profile);

    // const getOptions = {
    //   method: "GET",
    //   headers: {
    //     "Content-Type": "application/json",
    //     Accept: "*/*",
    //   },
    // };

    // await fetch(`http://localhost:3001/users/getPlaylists/22`, getOptions)
    //   .then((response) => response.json())
    //   .then((data) => console.log(data));

    // await props.getPlaylists(profile.playlists);

    setLocalEmail("");
    setLocalPass("");
    //history.push("/home");
  };

  return (
    <div id="loginContainer">
      <Link to="/Home" id="homeLink">
        Elliot Smith Player
      </Link>
      <form
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
          {loginSuccessChecker()}
          <Link to="/reset" id="resetLink">
            Forgot your password?
          </Link>
        </div>

        <button type="submit" id="submitLogin">
          <b>Login</b>
        </button>
        <button >
          console.log state
        </button>
      </form>
    </div>
  );
};

export default Login;
