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
  const wideTimeSlider = useRef();
  const fullscreenTimeSlider = useRef();
  const mobileTimeSlider = useRef();
  const [mobileAudioPlayer, setMobileAudioPlayer] = useState(false);
  const [audio, setAudio] = useState();
  const [initializeAudio, setInitializeAudio] = useState("default");
  const [paused, setPaused] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [deviceSize, setDeviceSize] = useState(window.innerWidth);
  const [activeSlider, setActiveSlider] = useState("");
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
    if (!audio) {
      const file = import("../media/245am.mp3");
      let audioElement = new Audio(file.default);
      setAudio(audioElement);
    }
  }, []);

  const playButtonCont = useRef();

  window.addEventListener("resize", () => {
    setDeviceSize(window.innerWidth);
  });

  useEffect(() => {
    if (props.albumartpath) {
      async function importFile() {
        const file = await import(
          `../media/${props.currentSong.albumartpath}.jpg`
        );
      }
    }
  }, [props.albumartpath]);

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
        if (wideTimeSlider.current) {
          wideTimeSlider.current.max = audio.duration;
        }
        if (fullscreenTimeSlider.current) {
          fullscreenTimeSlider.current.max = audio.duration;
        }
        if (mobileTimeSlider.current) {
          mobileTimeSlider.current.max = audio.duration;
        }
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

  const changeSlider = (type) => {
    if (type === "wide") {
      setCurrentTime(wideTimeSlider.current.value);
      setAudio((prevState) => {
        let prev = prevState;
        prevState.currentTime = wideTimeSlider.current.value;
        return prev;
      });
    } else if (type === "fullscreen") {
      setCurrentTime(fullscreenTimeSlider.current.value);
      setAudio((prevState) => {
        let prev = prevState;
        prevState.currentTime = fullscreenTimeSlider.current.value;
        return prev;
      });
    } else if (type === "mobile") {
      setCurrentTime(mobileTimeSlider.current.value);
      setAudio((prevState) => {
        let prev = prevState;
        prevState.currentTime = mobileTimeSlider.current.value;
        return prev;
      });
    }
  };

  useEffect(() => {
    if (wideTimeSlider.current) {
      let percentage = wideTimeSlider.current.value / duration;
      let width = wideTimeSlider.current.offsetWidth * percentage;
      wideTimeSlider.current.style.setProperty(
        "--seek-before-width",
        `${width}px`
      );
      if (duration > 0) {
        wideTimeSlider.current.max = duration;
      }
    }
  });

  useEffect(() => {
    if (fullscreenTimeSlider.current) {
      let percentage = fullscreenTimeSlider.current.value / duration;
      let width = fullscreenTimeSlider.current.offsetWidth * percentage;
      console.log(fullscreenTimeSlider.current.offsetWidth);
      fullscreenTimeSlider.current.style.setProperty(
        "--seek-before-width",
        `${width}px`
      );
      if (duration > 0) {
        fullscreenTimeSlider.current.max = duration;
      }
    }
  });

  useEffect(() => {
    if (mobileTimeSlider.current) {
      let percentage = mobileTimeSlider.current.value / duration;
      let width = mobileTimeSlider.current.offsetWidth * percentage;
      mobileTimeSlider.current.style.setProperty(
        "--seek-before-width",
        `${width}px`
      );
      if (duration > 0) {
        mobileTimeSlider.current.max = duration;
      }
    }
  });

  const checkAlbumArt = () => {
    if (props.albumArtPath) {
      return <img src={props.albumArtPath}></img>;
    }
  };

  const verifyClick = (e) => {
    if (
      e.target == playButtonCont.current ||
      playButtonCont.current.contains(e.target)
    ) {
      return;
    } else {
      setMobileAudioPlayer(true);
    }
  };

  const closeFullScreenAudioPlayer = () => {
    props.raiseFooterZIndex("lower");
    setMobileAudioPlayer(false);
  };

  useEffect(() => {
    if (deviceSize > 900) {
      setActiveSlider("wide");
    } else if (deviceSize < 900) {
      setActiveSlider("mobile");
    }
  }, [deviceSize]);

  const openFullScreenAudioPlayer = () => {
    props.raiseFooterZIndex("raise");
    return (
      <div id="mobileAudioPlayerCont">
        <div id="mobileAudioPlayer">
          <div id="mobileSongTopLayerCont">
            <div onClick={closeFullScreenAudioPlayer}>Close</div>
            <div>Album</div>
            <div>Options</div>
          </div>
          <div id="mobileSongAlbumCoverCont">
            <img src={props.albumArtPath}></img>
          </div>
          <div id="mobileSongInfoRowCont">
            <h1>{props.songName}</h1>
            <p>{props.artistName}</p>
          </div>
          <div id="mobileSongTimeBarCont">
            <input
              type="range"
              id="fullscreenTimeSlider"
              className="timeSlider"
              defaultValue="0"
              ref={fullscreenTimeSlider}
              onChange={() => changeSlider("fullscreen")}
              value={currentTime}
              style={{ cursor: "pointer" }}
            ></input>
            <div id="mobileSongTimeBarTime">
              <div id="currentTime">
                <p>{timeConverter(currentTime)}</p>
              </div>
              <div id="duration">
                <p>{timeConverter(duration)}</p>
              </div>
            </div>
            <div id="mobileTopLayerControls">
              {checkShuffle()}
              <IoPlaySkipBackSharp
                id="skipBackButton"
                color="white"
                style={{ height: "30px", width: "30px", cursor: "pointer" }}
                alt="Skip Back"
                onClick={() => {
                  skipBack();
                }}
              />
              {checkPaused("fullscreen")}
              <IoPlaySkipForwardSharp
                id="skipForwardButton"
                color="white"
                style={{ height: "30px", width: "30px", cursor: "pointer" }}
                alt="Skip Next"
                onClick={() => loadNextSong()}
              />
              <IoRepeatOutline
                color="grey"
                style={{ height: "30px", width: "30px" }}
                alt="Replay"
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  const checkMobile = () => {
    if (deviceSize > 900) {
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
            {checkPaused("wide")}
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
                id="wideTimeSlider"
                className="timeSlider"
                defaultValue="0"
                ref={wideTimeSlider}
                onChange={() => changeSlider("wide")}
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
    } else {
      return (
        <div
          id="mobileCurrentSongCont"
          style={
            props.currentSong.songtitle
              ? { display: "flex" }
              : { display: "none" }
          }
          onClick={verifyClick}
        >
          <div id="mobileCurrentSongLeft">
            <div id="mobileCurrentAlbum">{checkAlbumArt()}</div>
            <div id="mobileCurrentSong">
              <p>{props.songName}</p>
              <p>{props.artistName}</p>
            </div>
          </div>
          <div id="mobileCurrentSongRight" ref={playButtonCont}>
            {checkPaused("mobile")}
          </div>
          <div id="timeSliderCont">
            <input
              type="range"
              id="mobileTimeSlider"
              defaultValue="0"
              ref={mobileTimeSlider}
              // onChange={() => changeSlider("mobile")}
              value={currentTime}
              style={{ cursor: "pointer" }}
            ></input>
          </div>
        </div>
      );
    }
  };

  const checkPaused = (type) => {
    if (type === "fullscreen") {
      if (paused) {
        return (
          <IoPlayCircle
            id="playButton"
            color="white"
            alt="Play"
            style={{ cursor: "pointer", height: "60px", width: "60px" }}
            onClick={() => {
              playSong();
            }}
          />
        );
      } else if (paused === false) {
        return (
          <IoPauseCircle
            id="pauseButton"
            color="white"
            alt="Pause"
            style={{ cursor: "pointer", height: "60px", width: "60px" }}
            onClick={() => {
              pauseSong();
            }}
          />
        );
      } else {
        return (
          <IoPlayCircle
            id="blankPlayButton"
            className="playPauseButton"
            style={{ cursor: "pointer", height: "30px", width: "30px" }}
            color="grey"
          />
        );
      }
    } else if (type === "wide") {
      if (audio) {
        if (paused) {
          return (
            <IoPlayCircle
              id="playButtonWide"
              className="playPauseButton"
              color="white"
              alt="Play"
              style={{ cursor: "pointer", height: "45px", width: "45px" }}
              onClick={() => {
                playSong();
              }}
            />
          );
        } else if (paused === false) {
          return (
            <IoPauseCircle
              id="pauseButtonWide"
              className="playPauseButton"
              color="white"
              alt="Pause"
              style={{ cursor: "pointer", height: "45px", width: "45px" }}
              onClick={() => {
                pauseSong();
              }}
            />
          );
        }
      } else {
        return (
          <IoPlayCircle
            id="blankPlayButtonWide"
            className="playPauseButton"
            style={{ cursor: "pointer", height: "45px", width: "45px" }}
            color="grey"
          />
        );
      }
    } else if (type === "mobile") {
      if (paused) {
        return (
          <IoPlayCircle
            id="playButton"
            color="white"
            alt="Play"
            style={{ cursor: "pointer", height: "45px", width: "45px" }}
            onClick={() => {
              playSong();
            }}
          />
        );
      } else {
        return (
          <IoPauseCircle
            id="pauseButton"
            color="white"
            alt="Pause"
            style={{ cursor: "pointer", height: "45px", width: "45px" }}
            onClick={() => {
              pauseSong();
            }}
          />
        );
      }
    }
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
    <div id="audioPlayerModuleCont">
      {mobileAudioPlayer ? openFullScreenAudioPlayer() : checkMobile()}
    </div>
  );
};

export default AudioPlayer;
