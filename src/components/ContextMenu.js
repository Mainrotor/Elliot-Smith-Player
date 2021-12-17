import { Link } from "react-router-dom";

import { useState, useEffect } from "react";
import DeletePlaylist from "./DeletePlaylist.js";
import { FaAngleRight } from "react-icons/fa";
import { playSong } from "../redux/actions.js";

const ContextMenu = (props) => {
  const [dropDown, setDropDown] = useState(false);
  const [showDeleteMenu, setShowDeleteMenu] = useState(false);

  const contextMenuSelector = () => {
    switch (props.type) {
      case "playlist-song":
        return (
          <ul id="contextMenu">
            <li
              style={{
                color: "white",
                margin: "0px",
                borderBottom: "1px solid grey",
              }}
              onClick={() => {
                props.playSong(
                  props.song.songID,
                  props.song.songpath,
                  props.song.albumartpath,
                  props.song.songtitle,
                  props.song.tracklength,
                  props.song.artistname
                );
                filterSongs(props.playlistSongs);
              }}
            >
              Play
            </li>
            <li
              style={{ color: "white", margin: "0px" }}
              onClick={() => {
                props.addToQueue(props.song);
              }}
            >
              Add to queue
            </li>
            <li style={{ color: "white", margin: "0px" }} id="playlistButton">
              <div id="contextMenuPlaylist">
                <span id="playlistButtonText">Add to playlist</span>
                <span id="rightArrow">
                  <FaAngleRight />
                </span>
              </div>
              <div id="playlistDropDown" style={dropDownStyle()}>
                <ul>
                  {props.playlists.map((playlist) => {
                    return (
                      <li
                        onClick={() => pushToPlaylist(playlist.playlistID)}
                        key={playlist.playlistID}
                      >
                        {playlist.title}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
            <li
              style={{
                color: "white",
                margin: "0px",
                borderBottom: "1px solid grey",
              }}
              onClick={() => props.deleteSong(props.orderID, props.songID)}
            >
              Remove from playlist
            </li>
            <Link to={`/Album/${props.albumID}`} id="goAlbum">
              Go to album
            </Link>
          </ul>
        );
        break;
      case "search-song":
        console.log(props);
        return (
          <ul id="contextMenu">
            <li
              style={{
                color: "white",
                margin: "0px",
                borderBottom: "1px solid grey",
              }}
              onClick={() =>
                props.playSong(
                  props.song.songID,
                  props.song.songpath,
                  props.song.albumartpath,
                  props.song.songtitle,
                  props.song.tracklength,
                  props.song.artistname
                )
              }
            >
              Play
            </li>
            <li
              style={{ color: "white", margin: "0px" }}
              onClick={() => {
                props.addToQueue(props.song);
              }}
            >
              Add to queue
            </li>
            <li
              style={{
                color: "white",
                margin: "0px",
                borderBottom: "1px solid grey",
              }}
              id="playlistButton"
            >
              <div id="contextMenuPlaylist">
                <span id="playlistButtonText">Add to playlist</span>
                <span id="rightArrow">
                  <FaAngleRight />
                </span>
              </div>
              <div id="playlistDropDown" style={dropDownStyle()}>
                <ul>
                  {props.playlists.map((playlist) => {
                    return (
                      <li
                        onClick={() => pushToPlaylist(playlist.playlistID)}
                        key={playlist.playlistID}
                      >
                        {playlist.title}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
            <Link to={`/Album/${props.albumID}`} id="goAlbum">
              Go to album
            </Link>
          </ul>
        );
        break;
      case "playlist-link":
        return (
          <ul id="contextMenu">
            <li
              style={{
                color: "white",
                margin: "0px",
                borderBottom: "1px solid grey",
                cursor: "pointer",
              }}
            >
              Play Playlist
            </li>
            <li
              style={{ color: "white", margin: "0px", cursor: "pointer" }}
              onClick={() => props.renameFunction(true)}
            >
              Rename
            </li>
            <li
              style={{
                color: "white",
                margin: "0px",
                cursor: "pointer",
              }}
              onClick={() =>
                props.confirmDelete(props.playlistID, props.songTitle)
              }
            >
              Delete
            </li>
          </ul>
        );
        break;
      case "album-song":
        console.log(props);
        return (
          <ul id="contextMenu">
            <li
              style={{
                color: "white",
                margin: "0px",
                borderBottom: "1px solid grey",
              }}
              onClick={() => {
                props.playSong(
                  props.song.songID,
                  props.song.songpath,
                  props.song.albumartpath,
                  props.song.songtitle,
                  props.song.tracklength,
                  props.song.artistname
                );
                filterSongs(props.albumSongs);
              }}
            >
              Play
            </li>
            <li
              style={{ color: "white", margin: "0px" }}
              onClick={() => {
                props.addToQueue(props.song);
              }}
            >
              Add to queue
            </li>
            <li style={{ color: "white", margin: "0px" }}>
              Add to liked songs
            </li>
            <li style={{ color: "white", margin: "0px" }} id="playlistButton">
              <div id="contextMenuPlaylist">
                <span id="playlistButtonText">Add to playlist</span>
                <span id="rightArrow">
                  <FaAngleRight />
                </span>
              </div>
              <div id="playlistDropDown" style={dropDownStyle()}>
                <ul>
                  <li
                    onClick={() => createPlaylist()}
                    style={{ borderBottom: "solid 1px grey" }}
                  >
                    Add to new playlist
                  </li>
                  {props.playlists.map((playlist) => {
                    return (
                      <li
                        onClick={() => pushToPlaylist(playlist.playlistID)}
                        key={playlist.playlistID}
                      >
                        {playlist.title}
                      </li>
                    );
                  })}
                </ul>
              </div>
            </li>
            <Link to={`/Album/${props.albumID}`} id="goAlbum">
              Go to album
            </Link>
          </ul>
        );
        break;
      default:
        return (
          <ul id="contextMenu">
            <div id="playlistButton"></div>
          </ul>
        );
    }
  };

  const style = () => {
    return {
      top: props.y,
      left: props.x,
      display: props.showMenu ? "flex" : "none",
    };
  };

  const checkIfPlaylist = () => {
    if (props.playlistID) {
      return;
    }
  };

  const dropDownStyle = () => {
    let body = document.getElementById("mainWrap");
    let vw = body.clientWidth;
    let vh = body.clientHeight;
    if (props.x + 360 > vw) {
      return { display: dropDown ? "flex" : "none", left: "-170px" };
    }
    return { display: dropDown ? "flex" : "none", left: "180px" };
  };

  const filterSongs = (songs) => {
    let temp = [];
    songs.forEach((song) => {
      if (song.playlistID) {
        if (song.orderID != props.orderID) {
          let line = {
            albumID: song.albumID,
            albumartpath: song.album_art_path,
            orderID: song.orderID,
            songpath: song.path,
            playlistID: song.playlistID,
            songID: song.song_ID,
            songtitle: song.song_name,
            tracklength: song.track_length,
            artistname: "Elliot Smith",
          };
          temp.push(line);
        }
      } else if (song.trackNum) {
        console.log(song.trackNum + " " + props.song);
        if (song.trackNum != props.song.tracknum) {
          let line = {
            albumID: props.albumID,
            albumartpath: props.albumArtPath,
            songpath: song.path,
            songID: song.songID,
            songtitle: song.songName,
            tracklength: song.trackLength,
            tracknum: song.trackNum,
            artistname: "Elliot Smith",
          };
          temp.push(line);
        }
      }
    });
    props.pushAutoQueue(temp);
  };

  const deleteFromPlaylist = async (orderID, playlistID, songID, userID) => {
    let payload = {
      orderID: orderID,
      playlistID: playlistID,
      songID: songID,
      userID: userID,
    };

    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        authorization: `Bearer ${props.profile.accessToken}`,
      },
      body: JSON.stringify(payload),
    };

    await fetch(
      `https://reach-server.vercel.app/playlists/deleteSong/${songID}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success === "song-deleted") {
          console.log(data);
        }
        props.setServerResponse(data.success);
      });
  };

  const pushToPlaylist = async (id) => {
    let payload = {
      userID: props.profile.userID,
      playlistID: id,
      songID: props.songID,
    };

    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        authorization: `Bearer ${props.profile.accessToken}`,
      },
      body: JSON.stringify(payload),
    };

    await fetch(
      "https://reach-server.vercel.app/playlists/addSong",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => props.updateHook(data));
  };

  const createPlaylist = () => {};

  useEffect(() => {
    const playlistButton = document.getElementById("playlistButton");
    if (playlistButton) {
      playlistButton.addEventListener("mouseenter", () => {
        setDropDown(true);
      });
      playlistButton.addEventListener("mouseleave", () => {
        setDropDown(false);
      });
      return () => {
        playlistButton.removeEventListener("mouseenter", () => {
          setDropDown(true);
        });
        playlistButton.removeEventListener("mouseleave", () => {
          setDropDown(false);
        });
      };
    }
  }, [props.showMenu]);

  return (
    <div id="contextMenuCont" style={style()}>
      {contextMenuSelector()}
    </div>
  );
};

export default ContextMenu;
