import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

export default function useQueueHandler() {
  const [newCurrentSong, setNewCurrentSong] = useState({});
  const [userQueue, setUserQueue] = useState([]);
  const [autoQueue, setAutoQueue] = useState([]);
  const [songHistory, setSongHistory] = useState([]);

  const currentSong = useSelector((state) => state.currentSong);

  // songID: props.song.songID,
  // songpath: props.song.songpath,
  // albumartpath: props.song.albumartpath,
  // songtitle: props.song.songtitle,
  // tracklength: props.song.tracklength,
  // artistname: props.song.artistname,

  const addSongToQueue = (song) => {
    console.log(song);
    setUserQueue((prevState) => [...prevState, song]);
  };

  const songEndedHandler = (song) => {
    setSongHistory((prevState) => [song, ...prevState]);
    loadNextSong();
  };

  const loadNextSong = () => {
    console.log(userQueue);
    if (userQueue.length === 1) {
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
    } else if (userQueue.length > 1) {
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
      setNewCurrentSong(autoQueue[0]);
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
  };
}
