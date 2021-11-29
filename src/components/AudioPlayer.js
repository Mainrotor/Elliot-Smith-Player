import React, { useState, useEffect, useRef } from "react";
import { playSong } from "../redux/actions";
import {
  IoPauseCircle,
  IoPlayCircle,
  IoPlaySkipForwardSharp,
  IoPlaySkipBackSharp,
  IoShuffleOutline,
  IoRepeatOutline,
} from "react-icons/io5";
import useQueueHandler from "../hooks/useQueueHandler";

const AudioPlayer = (props) => {
  const [audio, setAudio] = useState();
  const [paused, setPaused] = useState(true);
  const {
    addSongToQueue,
    songEndedHandler,
    songHistory,
    newCurrentSong,
    loadNextSong,
    loadLastSong,
    userQueue,
  } = useQueueHandler();

  useEffect(() => {
    if (props.currentSong.songpath) {
      if (audio) {
        setAudio((prevState) => {
          let copy = prevState;
          copy.load();
          return copy;
        });
      }
      async function importFile() {
        const file = await import(`../media/${props.currentSong.songpath}.mp3`);
        let audioElement = new Audio(file.default);
        setAudio(audioElement);
      }
      importFile();
    }
  }, [props.currentSong.songpath]);

  useEffect(() => {
    if (props.songQueue.song) {
      addSongToQueue(props.songQueue.song);
    }
  }, [props.songQueue.song]);

  useEffect(() => {
    if (audio) {
      if (props.currentSong.played === false) {
        audio.play();
        setPaused(false);
      }
    }
  }, [audio]);

  useEffect(() => {
    console.log(newCurrentSong);
    if (newCurrentSong) {
      props.playSong(
        newCurrentSong.songID,
        newCurrentSong.songpath,
        newCurrentSong.albumartpath,
        newCurrentSong.songtitle,
        newCurrentSong.tracklength,
        newCurrentSong.artistname,
        newCurrentSong.playlistID,
        newCurrentSong.orderID
      );
    }
  }, [newCurrentSong]);

  useEffect(() => {
    if (audio) {
      audio.addEventListener("ended", () => {
        songEndedHandler(props.currentSong);
      });
      audio.removeEventListener("ended", () => {
        songEndedHandler(props.currentSong);
      });
    }
  });

  const playSong = () => {
    if (audio) {
      console.log(audio.currentTime);
      audio.play();
      setPaused(false);
    } else console.log("no song queued");
  };

  const pauseSong = () => {
    if (audio) {
      audio.pause();
      setPaused(true);
    } else console.log("no song queued");
  };

  const skipBack = () => {
    if (audio.currentTime > 1.9) {
      setAudio((prevState) => {
        let copy = prevState;
        copy.currentTime = 0;
        return copy;
      });
    } else loadLastSong();
  };

  const checkPaused = () => {
    if (audio) {
      if (paused) {
        return (
          <IoPlayCircle
            id="playButton"
            className="playPauseButton"
            color="white"
            alt="Play"
            onClick={() => {
              playSong();
            }}
          />
        );
      } else
        return (
          <IoPauseCircle
            id="pauseButton"
            className="playPauseButton"
            color="white"
            alt="Pause"
            onClick={() => {
              pauseSong();
            }}
          />
        );
    } else
      return (
        <IoPlayCircle
          id="blankPlayButton"
          className="playPauseButton"
          color="grey"
        />
      );
  };

  return (
    <div id="audioPlayerModule">
      <div id="topLayerControls">
        <IoShuffleOutline
          color="white"
          style={{ height: "25px", width: "25px" }}
          alt="Shuffle"
        />
        <IoPlaySkipBackSharp
          id="skipBackButton"
          color="white"
          style={{ height: "20px", width: "20px" }}
          alt="Skip Back"
          onClick={() => {
            skipBack();
          }}
        />
        {checkPaused()}
        <IoPlaySkipForwardSharp
          id="skipForwardButton"
          color="white"
          style={{ height: "20px", width: "20px" }}
          alt="Skip Next"
          onClick={() => loadNextSong()}
        />
        <IoRepeatOutline
          color="white"
          style={{ height: "25px", width: "25px" }}
          alt="Replay"
        />
      </div>
    </div>
  );
};

export default AudioPlayer;
