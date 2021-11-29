import React, { useState, useEffect } from "react";
import Heart from "../media/Heart.svg";
import Song from "../containers/Song.js";
import ContextMenu from "../containers/ContextMenu.js";
import Status from "../components/Status.js";
import useRightClick from "../hooks/useRightClick";

const Search = (props) => {
  const { x, y, showMenu, songID, whichMenu, song } = useRightClick();
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const updateHook = (data) => {
    props.setServerResponse(data.success);
  };

  const checkContextMenu = () => {
    if (whichMenu === "search-song") {
      return (
        <ContextMenu
          x={x}
          y={y}
          showMenu={showMenu}
          songID={songID}
          updateHook={updateHook}
          type={whichMenu}
          song={song}
        />
      );
    }
  };

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
      {checkContextMenu()}
      <input
        id="searchBar"
        placeholder="Elliot Smith songs, albums, or playlists"
        onChange={(e) => handleQueryChange(e)}
      ></input>
      <div id="searchResults">
        {searchResults.map((song) => {
          return (
            <Song
              song={song}
              key={song.song_id}
              songID={songID}
              showMenu={showMenu}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Search;
