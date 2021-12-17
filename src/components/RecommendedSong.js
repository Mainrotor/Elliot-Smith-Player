import React, { useState, useEffect, useRef } from "react";
import Heart from "../media/Heart.svg";
import HeartEmpty from "../media/HeartEmpty.svg";
import {
  IoPlaySharp,
  IoHeartOutline,
  IoEllipsisVertical,
} from "react-icons/io5";

const handleLikeSong = (id) => {};

const checkLiked = (props) => {
  if (props.likedSongs.includes(props.song.song_id)) return Heart;
  else return HeartEmpty;
};

const RecommendedSong = (props) => {
  const [hoverState, setHoverState] = useState(false);
  const [albumArtPath, setAlbumArtPath] = useState("");
  const [imgLoaded, setImgLoaded] = useState(false);

  const songRow = useRef();

  useEffect(() => {
    let songRow = document.getElementById(`song${props.song.song_id}`);
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
        <img
          className="recommendedSongImg"
          src={albumArtPath}
          style={
            hoverState ? { backgroundColor: "##e0e0e0", opacity: "70%" } : {}
          }
        ></img>
      );
    }
  };

  const checkClicked = () => {
    if (props.showMenu) {
      if (parseInt(props.songID) === parseInt(props.song.song_id)) {
        return {
          backgroundColor: "#0c1736",
        };
      } else {
        return {
          backgroundColor: "transparent",
        };
      }
    }
  };

  const checkHovered = () => {
    if (hoverState) {
      return (
        <div
          className="playButtonContSongRow"
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
          <IoPlaySharp
            className="recommendedPlayButtonSongRow"
            style={{ opacity: "100%" }}
          />
        </div>
      );
    } else return <div></div>;
  };

  return (
    <div
      className="recommendedSongRow"
      id={`song${props.song.song_id}`}
      albumid={props.song.albumID}
      style={checkClicked()}
      songpath={props.song.path}
      albumartpath={props.song.album_art_path}
      songtitle={props.song.song_name}
      tracklength={props.song.track_length}
      artistname={"Elliot Smith"}
      ref={songRow}
    >
      <div className="recommendedSongRowTop">
        <div className="recommendedSongImgCol">
          {checkHovered()}
          {checkImg()}
        </div>
      </div>
      <div className="recommendedSongRowBottom">
        <div className="recommendedSongInfoCol">
          <h1>{props.song.song_name}</h1>
          <p>Elliot Smith</p>
        </div>
        <IoEllipsisVertical
          id="recommendedVisibleContextMenu"
          className="visibleContextMenu"
          style={{
            width: "30px",
            height: "30px",
            fill: "white",
            cursor: "pointer",
          }}
        ></IoEllipsisVertical>
      </div>
    </div>
  );
};

export default RecommendedSong;
