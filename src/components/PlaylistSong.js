import React, { useState, useEffect } from "react";
import { IoPlaySharp } from "react-icons/io5";

const PlaylistSong = (props) => {
  const [hoverState, setHoverState] = useState(false);
  const [albumArtPath, setAlbumArtPath] = useState("");

  let songLength = props.song.track_length;
  let minutes = Math.floor(songLength / 60);
  let seconds = songLength - minutes * 60;

  useEffect(() => {
    let songRow = document.getElementById(`song${props.song.orderID}`);
    songRow.addEventListener("mouseenter", () => {
      setHoverState(true);
    });
    songRow.addEventListener("mouseleave", () => {
      setHoverState(false);
    });
    return () => {
      songRow.removeEventListener("mouseenter", () => {
        setHoverState(true);
      });
      songRow.removeEventListener("mouseleave", () => {
        setHoverState(false);
      });
    };
  });

  useEffect(() => {
    if (props.song.album_art_path) {
      async function importFile() {
        const file = await import(`../media/${props.song.album_art_path}.jpg`);
        setAlbumArtPath(file.default);
      }
      importFile();
    }
  }, [props.song.album_art_path]);

  const checkImg = () => {
    if (albumArtPath) {
      return (
        <img src={albumArtPath} style={{ width: "70px", height: "70px" }}></img>
      );
    }
  };

  const checkHovered = () => {
    if (
      hoverState ||
      parseInt(props.clickedOrderID) === parseInt(props.song.orderID)
    ) {
      return (
        <div
          className="playButtonContPlaylistSongRow"
          onClick={() =>
            props.playSong(
              props.song.song_id,
              props.song.path,
              props.song.album_art_path,
              props.song.song_name,
              props.song.track_length,
              "Elliot Smith"
            )
          }
        >
          <IoPlaySharp className="playButtonPlaylistSongRow" />
        </div>
      );
    } else return props.index + 1;
  };

  const checkClicked = () => {
    if (props.showMenu) {
      if (parseInt(props.clickedOrderID) === parseInt(props.song.orderID)) {
        return {
          backgroundColor: "#C8C8C8",
        };
      } else {
        return {
          backgroundColor: "transparent",
        };
      }
    }
  };

  return (
    <div
      className="playlistSongRow"
      id={`song${props.song.orderID}`}
      style={checkClicked()}
      songid={props.song.song_ID}
      orderid={props.song.orderID}
    >
      <div className="playlistSongNum">{checkHovered()}</div>
      <div className="playlistSongTitleCol">
        <div className="playlistSongImg">{checkImg()}</div>
        <div className="playlistSongTitleText">
          <div>
            <p>{props.song.song_name}</p>
          </div>
          <div>
            <p>Elliot Smith</p>
          </div>
        </div>
      </div>
      <div className="playlistSongAlbum">ALBUM</div>
      <div className="playlistSongDate">DATE</div>
      <div className="playlistSongLength">{`${minutes}:${seconds}`}</div>
    </div>
  );
};

export default PlaylistSong;
