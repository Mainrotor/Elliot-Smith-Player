import React, { useState, useEffect } from "react";
import { useHistory } from "react-router";
import { Link } from "react-router-dom";
import { IoMenu } from "react-icons/io5";
import NavLink from "../containers/NavLink.js";
import { ReactComponent as ElliotSmithLogo } from "../media/elliot_smith_logo.svg";
import { IoSearch, IoHomeSharp, IoAddCircleOutline } from "react-icons/io5";

const Header = (props) => {
  const [deviceSize, setDeviceSize] = useState(window.innerWidth);
  const [hamburgerStatus, setHamburgerStatus] = useState(false);
  const [navMenuClass, setNavMenuClass] = useState("closedMobileNavMenu");
  const [playlistLen, setPlaylistLen] = useState(1);

  window.addEventListener("resize", () => {
    setDeviceSize(window.innerWidth);
  });

  const handleHamburgerClick = () => {
    console.log("im being run");
    let value = hamburgerStatus ? false : true;
    setHamburgerStatus(value);
  };

  const handleDisplayMobileNavMenu = () => {
    var status = "closedMobileNavMenu";

    if (hamburgerStatus) {
      setTimeout(() => (status = "openMobileNavMenu, 750"));
    }
    console.log(status);
    return status;
  };

  useEffect(() => {
    console.log(props.playlists);
    if (props.playlists.length > 0) {
      setPlaylistLen(props.playlists.length + 1);
    }
  }, [props.playlists]);

  useEffect(() => {
    hamburgerStatus
      ? setTimeout(() => {
          setNavMenuClass("openMobileNavMenu");
        }, 150)
      : setNavMenuClass("closedMobileNavMenu");
  }, [hamburgerStatus]);

  const createPlaylist = () => {
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        authorization: `Bearer ${props.profile.accessToken}`,
      },
      body: JSON.stringify({
        title: `Playlist #${playlistLen}`,
        userID: props.profile.userID,
      }),
    };
    fetch(
      "https://reach-server.vercel.app/playlists/createPlaylist",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => [
        props.getPlaylist({
          title: data.title,
          playlistID: data.playlistID,
          userID: data.userID,
        }),
        props.setServerResponse(data.success),
      ]);
  };

  const hamburgerStatusChecker = () => {
    if (hamburgerStatus) {
      return (
        <div id="mobileNavMenu" className={navMenuClass}>
          <ul id="mobileNavMenuBody">
            <li>
              <Link
                to="/Home"
                className="navLinks"
                onClick={handleHamburgerClick}
              >
                <IoHomeSharp className="navSymbols" />
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/Search"
                className="navLinks"
                onClick={handleHamburgerClick}
              >
                <IoSearch className="navSymbols" />
                Search
              </Link>
            </li>
            <li onClick={createPlaylist} className="navLinks">
              <IoAddCircleOutline className="navSymbols" />
              Create Playlist
            </li>
            <ul id="playlistsMobile">
              {props.playlists.map((listing) => {
                return (
                  <NavLink
                    key={props.playlists.indexOf(listing)}
                    playlistid={listing.playlistID}
                    title={listing.title}
                    userid={props.profile.userID}
                  />
                );
              })}
            </ul>
          </ul>
          <div id="mobileNavMenuFooter">
            <Link
              to={"/CreateAccount"}
              id="signUpButtonMobile"
              style={{
                textDecoration: "none",
              }}
              onClick={handleHamburgerClick}
            >
              Sign up
            </Link>
            {/* <button id="signUpButtonMobile" onClick={handleHamburgerClick}>
              Sign Up
            </button> */}
            <Link
              to={"/Login"}
              id="loginButtonMobile"
              style={{
                textDecoration: "none",
              }}
              onClick={handleHamburgerClick}
            >
              Log in
            </Link>
          </div>
        </div>
      );
    }
  };

  let history = useHistory();
  const checkLogIn = (props) => {
    if (deviceSize > 1000) {
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
    } else {
      return (
        <div className={hamburgerStatus ? "openHamburger" : "closedHamburger"}>
          <div id="mobileHeaderHead">
            <IoMenu id="hamburger" onClick={() => handleHamburgerClick()} />
            <ElliotSmithLogo
              id="elliotSmithLogoMobile"
              onClick={() => history.push("/Home")}
              style={{ cursor: "pointer" }}
            />
          </div>
          {hamburgerStatusChecker()}
        </div>
      );
    }
    console.log("bigger than 1000");
  };

  return (
    <header id="header">
      <div id="leftHead"></div>
      <div id="rightHead">{checkLogIn(props)}</div>
    </header>
  );
};

export default Header;
