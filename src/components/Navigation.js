import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import ContextMenu from "../containers/ContextMenu.js";
import useRightClick from "../hooks/useRightClick";
import Playlist from "./Playlist.js";
import NavLink from "../containers/NavLink.js";

const Navigation = (props) => {
  const [playlistLen, setPlaylistLen] = useState(1);
  const [rename, setRename] = useState(false);
  const { x, y, showMenu, songID, playlistID, songTitle, renameID, whichMenu } =
    useRightClick();
  const [albumArtPath, setAlbumArtPath] = useState("");

  const updateHook = (data) => {
    props.setServerResponse(data.success);
  };

  const checkAlbumArt = () => {
    if (albumArtPath) {
      return <img src={albumArtPath}></img>;
    }
  };

  const checkContextMenu = () => {
    if (whichMenu === "playlist-link") {
      return (
        <ContextMenu
          x={x}
          y={y}
          showMenu={showMenu}
          playlistID={playlistID}
          songTitle={songTitle}
          updateHook={updateHook}
          type={"playlist-link"}
          renameFunction={setRename}
        />
      );
    }
  };

  const checkClicked = (propID) => {
    if (parseInt(playlistID) === parseInt(propID)) {
      return {
        color: "#d2c217",
      };
    } else {
      return {
        color: "#f5f5f5",
      };
    }
  };

  useEffect(() => {
    console.log(props.playlists);
    if (props.playlists.length > 0) {
      setPlaylistLen(props.playlists.length + 1);
    }
  }, [props.playlists]);

  useEffect(() => {
    if (props.currentSong.albumartpath) {
      async function importFile() {
        const file = await import(
          `../media/${props.currentSong.albumartpath}.jpg`
        );
        setAlbumArtPath(file.default);
      }
      importFile();
    }
  }, [props.currentSong]);

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

  return (
    <section id="navContainer">
      {checkContextMenu()}
      <div id="navLists">
        <h2>Elliot Smith Player</h2>
        <ul id="nav">
          <li>
            <Link to="/Home" className="navLinks">
              Home
            </Link>
          </li>
          <li>
            <Link to="/Search" className="navLinks">
              Search
            </Link>
          </li>
          <li onClick={createPlaylist} className="navLinks">
            Create Playlist
          </li>
        </ul>
        <ul id="playlists">
          {props.playlists.map((listing) => {
            return (
              <NavLink
                showMenu={showMenu}
                key={props.playlists.indexOf(listing)}
                checkClickedFunction={checkClicked}
                renameID={renameID}
                rename={rename}
                setRename={setRename}
                playlistID={listing.playlistID}
                title={listing.title}
                userID={props.profile.userID}
              />
            );
          })}
        </ul>
      </div>
      <div id="albumArt">{checkAlbumArt()}</div>
    </section>
  );
};

export default Navigation;
