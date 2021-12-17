import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function useQueueHandler() {
  const [newCurrentSong, setNewCurrentSong] = useState({});
  const [userQueue, setUserQueue] = useState([]);
  const [removeSong, setRemoveSong] = useState([]);
  const [autoQueue, setAutoQueue] = useState([]);
  const [songHistory, setSongHistory] = useState([]);
  const [shuffleToggle, setShuffleToggle] = useState(false);

  useEffect(() => {
    console.log(userQueue);
  }, [userQueue]);

  const currentSong = useSelector((state) => state.currentSong);

  // songID: props.song.songID,
  // songpath: props.song.songpath,
  // albumartpath: props.song.albumartpath,
  // songtitle: props.song.songtitle,
  // tracklength: props.song.tracklength,
  // artistname: props.song.artistname,

  const selectShuffleSong = (max) => {
    return Math.floor(Math.random() * max);
  };

  const addSongToQueue = (song) => {
    if (userQueue.length === 0) {
      setUserQueue([song[0]]);
    } else if (userQueue.length > 0) {
      setUserQueue((prevState) => [...prevState, song[0]]);
    }
  };

  const songEndedHandler = (song) => {
    setSongHistory((prevState) => [song, ...prevState]);
    loadNextSong();
  };

  const loadNextSong = () => {
    if (userQueue.length === 1) {
      console.log("equals 1");
      setNewCurrentSong(userQueue[0]);
      if (songHistory[0]) {
        if (songHistory[0].songID !== currentSong.songID) {
          setSongHistory((prevState) => [currentSong, ...prevState]);
        }
      } else {
        setSongHistory((prevState) => [currentSong, ...prevState]);
      }
      setUserQueue([]);
    } else if (userQueue.length > 1) {
      console.log("greater than 1");
      setNewCurrentSong(userQueue[0]);
      if (songHistory[0]) {
        if (songHistory[0].songID !== currentSong.songID) {
          setSongHistory((prevState) => [currentSong, ...prevState]);
        }
      } else {
        setSongHistory((prevState) => [currentSong, ...prevState]);
      }
      setUserQueue((prevState) => {
        let copy = [...prevState];
        copy.splice(0, 1);
        return copy;
      });
    } else if (autoQueue.length > 0) {
      console.log("autoQueue");
      if (shuffleToggle) {
        let random = selectShuffleSong(autoQueue.length);
        console.log(random);
        console.log(autoQueue[random]);
        setNewCurrentSong(autoQueue[random]);
        setSongHistory(autoQueue[random]);
        autoQueue.splice(random, 1);
      } else {
        if (songHistory[0]) {
          if (songHistory[0].songID !== currentSong.songID) {
            setSongHistory((prevState) => [currentSong, ...prevState]);
          }
        } else {
          setSongHistory((prevState) => [currentSong, ...prevState]);
        }
        setRemoveSong(autoQueue[0]);
        setNewCurrentSong(autoQueue[0]);
      }
    }
  };

  const loadLastSong = () => {
    if (songHistory.length > 0) {
      setNewCurrentSong(songHistory[0]);
      setSongHistory((prevState) => {
        let copy = [...prevState];
        copy.splice(0, 1);
        return copy;
      });
    }
  };

  return {
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
  };
}
