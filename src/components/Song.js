import React, { useState, useEffect } from "react";
import Heart from "../media/Heart.svg";
import HeartEmpty from "../media/HeartEmpty.svg";

const handleLikeSong = (id) => {};

const checkLiked = (props) => {
  if (props.likedSongs.includes(props.song.song_id)) return Heart;
  else return HeartEmpty;
};

const Song = (props) => {
  return (
    <tr class="songRow">
      <td class="searchImgCol">
        <div c></div>
      </td>
      <td>
        <table id="songNameCol">
          <tr>{props.song.song_name}</tr>
          <tr>Elliot Smith</tr>
        </table>
      </td>
      <td>
        <img
          id="likeSong"
          src={checkLiked(props)}
          onClick={(props) => {
            handleLikeSong(props);
          }}
        ></img>
      </td>
    </tr>
  );
};

export default Song;
