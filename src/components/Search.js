import React, { useState, useEffect } from "react";
import Heart from "../media/Heart.svg";
import Song from "../containers/Song.js";

const Search = (props) => {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const searchAPI = (query) => {
    fetch(`https://reach-server-mainrotor.vercel.app/song/${query}`)
      .then((response) => response.json())
      .then((data) => setSearchResults(data));
  };

  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value);
    if (searchQuery.length > 1) {
      searchAPI(searchQuery);
    }
  };

  return (
    <div id="searchPageCont">
      <input
        id="searchBar"
        placeholder="Elliot Smith songs, albums, or playlists"
        onChange={(e) => handleQueryChange(e)}
      ></input>
      <table id="searchResults">
        {searchResults.map((song) => {
          return <Song song={song} key={song.song_id} />;
        })}
      </table>
    </div>
  );
};

export default Search;
