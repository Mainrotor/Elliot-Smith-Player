import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { ReactComponent as ElliotSmithLogo } from "../media/elliot_smith_logo_large.svg";
import { Redirect } from "react-router";
import axios from "axios";

const CreateAccount = (props) => {
  const [isValid, setIsValid] = useState(null);
  const [serverResponse, setServerResponse] = useState("default");
  const [accountDetails, setAccountDetails] = useState({
    email: "",
    confirmEmail: "",
    username: "",
    pass: "",
  });

  const handleFormChange = (name, e) => {
    setAccountDetails((prevState) => ({
      ...prevState,
      [name]: e.target.value,
    }));
  };

  const postAccount = (acct) => {
    console.log("im being run");
    console.log(JSON.stringify(acct));
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
      body: JSON.stringify(acct),
    };
    fetch("https://reach-server.vercel.app/users/signUp", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setServerResponse(data.success);
        if (data.success === "account-created") {
          props.setServerResponse(data.success);
        }
      });
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (accountDetails.email === accountDetails.confirmEmail) {
      postAccount(accountDetails);
    } else {
      setServerResponse("unequal-emails");
    }
  };

  const checkIsValid = (e) => {
    if (accountDetails.confirmEmail === accountDetails.email) {
    }
  };

  const checkError = () => {
    switch (serverResponse) {
      case "unknown-error":
        console.log("am i working");
        return (
          <div id="unknownErrorBox">
            <p>An unknown error occured</p>
          </div>
        );
        break;
      case "email-in-use":
        console.log("test");
        return (
          <div id="emailInUseBox">
            <p>This email is already in use</p>
          </div>
        );
      case "unequal-emails":
        return (
          <div id="unequalEmailsBox">
            <p>Your emails are inconsistent</p>
          </div>
        );
        break;
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

  return (
    <div id="createAccContainer">
      <Link to="/Home" id="homeLinkCreateAccount">
        <ElliotSmithLogo
          id="homeLogoCreatAccount"
          style={{ width: "350px", height: "70px" }}
        />
      </Link>
      <h1>Sign up for free to listen.</h1>
      <form
        id="createAccountForm"
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <label htmlFor="uname">Create a username</label>
        <input
          type="text"
          placeholder="Create a username"
          name="uname"
          onChange={(e) => {
            handleFormChange("username", e);
          }}
          value={accountDetails.username}
        />
        <label htmlFor="email">What's your email?</label>
        <input
          type="email"
          placeholder="Enter your email"
          name="email"
          required
          onChange={(e) => {
            handleFormChange("email", e);
          }}
          style={redBorder()}
          value={accountDetails.email}
        />
        <label htmlFor="confirmEmail">Confirm your email</label>
        <input
          type="email"
          placeholder="Enter your email again"
          name="confirmEmail"
          required
          onChange={(e) => {
            handleFormChange("confirmEmail", e);
          }}
          style={redBorder()}
          value={accountDetails.confirmEmail}
        />
        <label htmlFor="password">Create a password</label>
        <input
          type="password"
          placeholder="Create a password"
          name="password"
          onChange={(e) => {
            handleFormChange("pass", e);
          }}
          value={accountDetails.pass}
        />
        <Link to="/Login">Already have an account?</Link>
        <button type="submit" id="submitSignup">
          Sign up
        </button>
        {checkError()}
      </form>
    </div>
  );
};

export default CreateAccount;
