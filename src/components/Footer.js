import SomeSong from "./someSong.mp3";
import AudioPlayer from "../containers/AudioPlayer";
import React, { useState, useEffect } from "react";

const Footer = (props) => {
  const [songName, setSongName] = useState("");
  const [artistName, setArtistName] = useState("");

  useEffect(() => {
    if (props.currentSong.songtitle) {
      setSongName(props.currentSong.songtitle);
    } else {
      setSongName("");
    }
    if (props.currentSong.artistname) {
      setArtistName(props.currentSong.artistname);
    } else {
      setArtistName("");
    }
  }, [props.currentSong]);

  const tracks = [
    {
      title: "string",
      artist: "string",
      audioSrc: "string",
    },
  ];

  return (
    <footer id="footer">
      <section id="loadedSongInfo">
        <h1 id="loadedSongTitle">{songName}</h1>
        <h2 id="loadedArtistName">{artistName}</h2>
      </section>
      <section id="playerControls">
        <AudioPlayer />
        {/* <audio src={SomeSong} autoplay controls id="song">
        </audio>
        <button onClick={() => playSong()} style={{width: "200px", marginBottom: "20px"}}>PLAY</button>
        <div id="durationBar"></div> */}
      </section>
      <section id="volumeSection"></section>
    </footer>
  );
};

export default Footer;
