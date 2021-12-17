import React, { useState, useEffect } from "react";
import { IoPlaySharp, IoEllipsisVertical } from "react-icons/io5";

const AlbumSong = (props) => {
  const [hoverState, setHoverState] = useState(false);
  const [albumArtPath, setAlbumArtPath] = useState("");
  const [length, setLength] = useState("0:00");

  useEffect(() => {
    let songRow = document.getElementById(`song${props.song.songID}`);
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

  const checkHovered = () => {
    if (
      hoverState ||
      parseInt(props.clickedSongID) === parseInt(props.song.songID)
    ) {
      return (
        <div
          className="playButtonContPlaylistSongRow"
          onClick={() => {
            props.playSong(
              props.song.songID,
              props.song.path,
              props.albumArtPath,
              props.song.songName,
              props.song.track_length,
              "Elliot Smith",
              null,
              props.albumid
            );
            filterSongs(props.albumSongs);
          }}
        >
          <IoPlaySharp className="playButtonPlaylistSongRow" />
        </div>
      );
    } else return props.index + 1;
    setHoverState(false);
  };

  const checkClicked = () => {
    if (props.showMenu) {
      if (parseInt(props.clickedSongID) === parseInt(props.song.songID)) {
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

  const timeConverter = (seconds) => {
    let time = new Date(seconds * 1000).toISOString().substr(14, 5);
    time = time.split("");
    if (time[0] === "0") {
      time.splice(0, 1);
    }
    time.join();
    return time;
  };

  useEffect(() => {
    if (props.song.trackLength) {
      setLength(timeConverter(props.song.trackLength));
    }
  }, [props.song?.trackLength]);

  /*remove current song and push rest of album songs to autoQueue*/
  const filterSongs = (songs) => {
    props.resetAutoQueue();
    let temp = [];
    songs.forEach((song) => {
      if (song.trackNum != props.song.trackNum) {
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
    });
    props.pushAutoQueue(temp);
  };

  return (
    <div
      className="albumSongRow"
      id={`song${props.song.songID}`}
      style={checkClicked()}
      songid={props.song.songID}
      orderid={props.song.trackNum}
      song={props.song}
      songpath={props.song.path}
      albumartpath={props.albumArtPath}
      songtitle={props.song.songName}
      tracklength={props.song.trackLength}
      artistname={"Elliot Smith"}
      tracknum={props.song.trackNum}
    >
      <div className="albumSongNum">{checkHovered()}</div>
      <div className="albumSongTitleCol">
        <div className="albumSongTitleText">
          <div className="albumSongTitle">
            <p>{props.song.songName}</p>
          </div>
          <div className="albumSongRowArtistName">
            <p>Elliot Smith</p>
          </div>
        </div>
      </div>
      <div className="albumSongLength">{length}</div>
      <IoEllipsisVertical
        className="visibleContextMenu"
        style={{
          width: "30px",
          height: "30px",
          fill: "white",
          cursor: "pointer",
        }}
      ></IoEllipsisVertical>
    </div>
  );
};

export default AlbumSong;
