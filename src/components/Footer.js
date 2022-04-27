import SomeSong from "./someSong.mp3";
import AudioPlayer from "../containers/AudioPlayer";
import React, { useState, useEffect, useRef } from "react";
import {
  IoPauseCircle,
  IoPlayCircle,
  IoSearch,
  IoHomeSharp,
  IoAddCircleOutline,
  IoPersonAdd,
} from "react-icons/io5";
import { Link } from "react-router-dom";

const Footer = (props) => {
  const footer = useRef();
  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");
  const [deviceSize, setDeviceSize] = useState(window.innerWidth);
  const [albumArtPath, setAlbumArtPath] = useState("");
  const [playlistLen, setPlaylistLen] = useState(1);

  window.addEventListener("resize", () => {
    setDeviceSize(window.innerWidth);
  });

  const updateHook = (data) => {
    props.setServerResponse(data.success);
  };

  const raiseFooterZIndex = (type) => {
    if (type === "raise") {
      footer.current.style.zIndex = 25;
    } else if (type === "lower") {
      footer.current.style.zIndex = 19;
    }
  };

  useEffect(() => {
    if (props.currentSong.songtitle) {
      setSongName(props.currentSong.songtitle);
    }
    if (props.currentSong.artistname) {
      setArtistName(props.currentSong.artistname);
    }

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

  useEffect(() => {
    console.log(props.playlists);
    if (props.playlists.length > 0) {
      setPlaylistLen(props.playlists.length + 1);
    }
  }, [props.playlists]);

  const tracks = [
    {
      title: "string",
      artist: "string",
      audioSrc: "string",
    },
  ];

  const checkAlbumArt = () => {
    if (albumArtPath) {
      console.log(albumArtPath);
      return <img src={albumArtPath}></img>;
    }
  };

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

  const checkLoginStatus = () => {
    if (props.profile.loggedIn) {
      return (
        <div id="createPlaylistButton">
          <div onClick={createPlaylist}>
            <IoAddCircleOutline className="navSymbols" />
            Create Playlist
          </div>
        </div>
      );
    } else {
      return (
        <div>
          <Link to="/CreateAccount" className="footerLinks">
            <IoPersonAdd className="footerSymbols" />
            Sign Up
          </Link>
        </div>
      );
    }
  };

  const deviceCheckerTwo = () => {
    if (deviceSize > 900) {
      return (
        <div id="wideFooter">
          <section id="loadedSongInfo">
            <h1 id="loadedSongTitle">{songName}</h1>
            <h2 id="loadedArtistName">{artistName}</h2>
          </section>
          <section id="playerControls">
            <AudioPlayer />
          </section>
          <section id="volumeSection"></section>
        </div>
      );
    } else {
      return (
        <div id="mobileFooter">
          <AudioPlayer
            currentSong={props.currentSong}
            songName={songName}
            artistName={artistName}
            albumArtPath={albumArtPath}
            raiseFooterZIndex={raiseFooterZIndex}
          />
          <div id="footerMenuCont">
            <div>
              <Link to="/Home" className="footerLinks">
                <IoHomeSharp className="footerSymbols" />
                Home
              </Link>
            </div>
            <div>
              <Link to="/Search" className="footerLinks">
                <IoSearch className="footerSymbols" />
                Search
              </Link>
            </div>
            {checkLoginStatus()}
          </div>
        </div>
      );
    }
  };

  const deviceChecker = () => {
    if (deviceSize > 900) {
      console.log(songName);
      return (
        <div>
          <h1 id="loadedSongTitle">{songName}</h1>
          <h2 id="loadedArtistName">{artistName}</h2>
        </div>
      );
    } else {
      return <div></div>;
    }
  };

  return (
    <footer id="footer" ref={footer}>
      {deviceCheckerTwo()}
    </footer>
  );
};

export default Footer;
