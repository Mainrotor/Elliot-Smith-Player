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
  const timeSlider = useRef();
  const [audio, setAudio] = useState();
  const [paused, setPaused] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const {
    addSongToQueue,
    songEndedHandler,
    songHistory,
    newCurrentSong,
    loadNextSong,
    loadLastSong,
    userQueue,
    setAutoQueue,
    shuffleToggle,
    setShuffleToggle,
    removeSong,
  } = useQueueHandler();

  useEffect(() => {
    if (props.currentSong.songpath) {
      console.log(props.currentSong);
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
  }, [props.currentSong]);

  useEffect(() => {
    if (props.songQueue.length > 0) {
      addSongToQueue(props.songQueue);
      props.setServerResponse("added-queue");
      props.resetQueue();
    }
  }, [props.songQueue]);

  useEffect(() => {
    if (audio) {
      if (props.currentSong.played === false) {
        audio.play();
        setPaused(false);
      }
    }
  }, [audio]);

  /*listen to global state autoQueue for new autoQueue*/

  useEffect(() => {
    if (props.autoQueue) {
      setAutoQueue(props.autoQueue);
    }
  }, [props.autoQueue]);

  /* listen if a song needs to be removed from global autoQueue*/

  useEffect(() => {
    if (removeSong) {
      props.removeFromAutoQueue(removeSong);
    }
  }, [removeSong]);

  /*set duration*/

  /*set current time*/
  useEffect(() => {
    if (audio) {
      audio.addEventListener("timeupdate", () => {
        setCurrentTime(audio.currentTime);
      });
      audio.removeEventListener("timeupdate", () => {
        setCurrentTime(audio.currentTime);
      });
      audio.addEventListener("durationchange", () => {
        setDuration(audio.duration);
        timeSlider.current.max = audio.duration;
      });
    }
  }, [audio]);

  const timeConverter = (seconds) => {
    let time = new Date(seconds * 1000).toISOString().substr(14, 5);
    time = time.split("");
    if (time[0] === "0") {
      time.splice(0, 1);
    }
    time.join();
    return time;
  };

  /*load new song*/
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

  /*listen for if song ended*/
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

  const changeSlider = () => {
    setCurrentTime(timeSlider.current.value);
    setAudio((prevState) => {
      let prev = prevState;
      prevState.currentTime = timeSlider.current.value;
      return prev;
    });
  };

  useEffect(() => {
    timeSlider.current.style.setProperty(
      "--seek-before-width",
      `${(timeSlider.current.value / duration) * 100}%`
    );
  });

  const checkPaused = () => {
    if (audio) {
      if (paused) {
        return (
          <IoPlayCircle
            id="playButton"
            className="playPauseButton"
            color="white"
            alt="Play"
            style={{ cursor: "pointer" }}
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
            style={{ cursor: "pointer" }}
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

  const checkShuffle = () => {
    if (shuffleToggle) {
      return (
        <IoShuffleOutline
          color="grey"
          style={{ height: "25px", width: "25px" }}
          alt="Shuffle"
          // onClick={() => {
          //   setShuffleToggle(false);
          // }}
        />
      );
    } else {
      return (
        <IoShuffleOutline
          color="grey"
          style={{ height: "25px", width: "25px" }}
          alt="Shuffle"
          // onClick={() => {
          //   setShuffleToggle(true);
          // }}
        />
      );
    }
  };

  return (
    <div id="audioPlayerModule">
      <div id="topLayerControls">
        {checkShuffle()}
        <IoPlaySkipBackSharp
          id="skipBackButton"
          color="white"
          style={{ height: "20px", width: "20px", cursor: "pointer" }}
          alt="Skip Back"
          onClick={() => {
            skipBack();
          }}
        />
        {checkPaused()}
        <IoPlaySkipForwardSharp
          id="skipForwardButton"
          color="white"
          style={{ height: "20px", width: "20px", cursor: "pointer" }}
          alt="Skip Next"
          onClick={() => loadNextSong()}
        />
        <IoRepeatOutline
          color="grey"
          style={{ height: "25px", width: "25px" }}
          alt="Replay"
        />
      </div>
      <div id="bottomLayerControls">
        <div id="timeSliderCont">
          <div id="currentTime">
            <p>{timeConverter(currentTime)}</p>
          </div>
          <input
            type="range"
            id="timeSlider"
            defaultValue="0"
            ref={timeSlider}
            onChange={() => changeSlider()}
            value={currentTime}
            style={{ cursor: "pointer" }}
          ></input>
          <div id="duration">
            <p>{timeConverter(duration)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
