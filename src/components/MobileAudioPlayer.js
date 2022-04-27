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

const MobileAudioPlayer = () => {
  const timeSlider = useRef();
  const [audio, setAudio] = useState();
  const [paused, setPaused] = useState(true);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [deviceSize, setDeviceSize] = useState(window.innerWidth);
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
};
