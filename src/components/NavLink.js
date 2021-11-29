import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const NavLink = (props) => {
  const [newTitle, setNewTitle] = useState("");

  const handleClick = (e) => {
    if (props.rename && e.target.id !== "renamePlaylist") {
      props.setRename(false);
      setNewTitle("");
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, [props.rename]);

  const submitHandler = async (e) => {
    e.preventDefault();

    let payload = {
      userID: props.profile.userID,
      playlistID: props.playlistID,
      title: newTitle,
    };

    const requestOptions = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        authorization: `Bearer ${props.profile.accessToken}`,
      },
      body: JSON.stringify(payload),
    };

    await fetch(
      "https://reach-server.vercel.app/playlists/renamePlaylist",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success === "Playlist renamed") {
          props.renamePlaylist(props.playlistID, newTitle);
          setNewTitle("");
          props.setRename(false);
        }
      });
  };

  const handleChange = (e) => {
    setNewTitle(e.target.value);
  };

  const checkStatus = () => {
    if (
      parseInt(props.renameID) === parseInt(props.playlistID) &&
      props.rename
    ) {
      return (
        <form onSubmit={(event) => submitHandler(event)}>
          <input
            placeholder={props.title}
            onChange={(event) => handleChange(event)}
            value={newTitle}
            id="renamePlaylist"
            autoFocus
          ></input>
        </form>
      );
    } else {
      return (
        <li>
          <Link
            to={`/Playlist/${props.playlistID}/${props.userID}`}
            className="playlistLink"
            playlistID={props.playlistID}
            title={props.title}
            style={
              props.showMenu ? props.checkClickedFunction(props.playlistID) : {}
            }
          >
            {props.title}
          </Link>
        </li>
      );
    }
  };

  return checkStatus();
};

export default NavLink;
