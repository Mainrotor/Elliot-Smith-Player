import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import { Redirect } from "react-router";
import axios from "axios";

const CreateAccount = (props) => {
  const [isValid, setIsValid] = useState(null);
  const [serverResponse, setServerResponse] = useState({});

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
      .then((data) => props.setServerResponse(data.success));
  };

  const submitHandler = (e) => {
    e.preventDefault();
    if (accountDetails.email === accountDetails.confirmEmail) {
      postAccount(accountDetails);
    } else {
      console.log("error");
    }
  };

  const checkIsValid = (e) => {
    if (accountDetails.confirmEmail === accountDetails.email) {
    }
  };

  return (
    <div id="createAccContainer">
      <Link to="/Home" id="homeLink">
        Elliot Smith Player
      </Link>
      <h1>Sign up for free to listen.</h1>
      <form
        id="createAccountForm"
        onSubmit={(e) => {
          submitHandler(e);
        }}
      >
        <label htmlFor="uname">What's your name?</label>
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
      </form>
    </div>
  );
};

export default CreateAccount;
