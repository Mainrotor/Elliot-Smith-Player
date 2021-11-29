import { useState, useEffect } from "react";

export default function useRightClick() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [songID, setSongID] = useState(0);
  const [songTitle, setSongTitle] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [playlistID, setPlaylistID] = useState(0);
  const [renameID, setRenameID] = useState(0);
  const [whichMenu, setWhichMenu] = useState("");
  const [clickedOrderID, setClickedOrderID] = useState(0);
  const [song, setSong] = useState({});

  const handleContextMenu = (e) => {
    let playlistSongRow = document.getElementsByClassName("playlistSongRow");
    let searchResults = document.getElementById("searchResults");
    let songRow = document.getElementsByClassName("songRow");
    let playlistLink = document.getElementsByClassName("playlistLink");
    let playlistsContainer = document.getElementById("playlists");
    let playlistTable = document.getElementById("playlistBody");

    if (searchResults) {
      if (searchResults.contains(e.target)) {
        setShowMenu(false);
        for (let i = 0; i < songRow.length; i++) {
          if (songRow[i].contains(e.target) || songRow[i] === e.target) {
            e.preventDefault();
            setX(e.pageX);
            setY(e.pageY);
            var regex = /\d+/g;
            let stringSongID = songRow[i].id.match(regex);
            setSongID(parseInt(stringSongID));
            setShowMenu(true);
            setSong({
              songID: parseInt(stringSongID[0]),
              songpath: songRow[i].attributes.songpath.value,
              albumartpath: songRow[i].attributes.albumartpath.value,
              songtitle: songRow[i].attributes.songTitle.value,
              tracklength: parseInt(songRow[i].attributes.trackLength.value),
              artistname: songRow[i].attributes.artistname.value,
            });
            setWhichMenu("search-song");
            break;
          }
        }
      }
    }
    if (playlistTable) {
      if (playlistTable.contains(e.target)) {
        setShowMenu(false);
        for (let i = 0; i < playlistSongRow.length; i++) {
          if (
            playlistSongRow[i].contains(e.target) ||
            playlistSongRow[i] === e.target
          ) {
            e.preventDefault();
            setX(e.pageX);
            setY(e.pageY);
            setSongID(playlistSongRow[i].attributes.songid.value);
            setShowMenu(true);
            setWhichMenu("playlist-song");
            setClickedOrderID(playlistSongRow[i].attributes.orderid.value);
            break;
          }
        }
      }
    }

    if (playlistsContainer) {
      if (playlistsContainer.contains(e.target)) {
        setShowMenu(false);
        for (let i = 0; i < playlistLink.length; i++) {
          if (
            playlistLink[i].contains(e.target) ||
            playlistLink[i] === e.target
          ) {
            e.preventDefault();
            setX(e.pageX);
            setY(e.pageY);
            setPlaylistID(e.target.attributes.playlistID.value);
            setRenameID(e.target.attributes.playlistID.value);
            setSongTitle(e.target.attributes.title.value);
            setShowMenu(true);
            setWhichMenu("playlist-link");
            break;
          }
        }
      }
    }
  };

  const handleClick = () => {
    showMenu && setShowMenu(false);
    setPlaylistID(0);
    setClickedOrderID(0);
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    document.addEventListener("contextmenu", handleContextMenu);
    return () => {
      document.removeEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleContextMenu);
    };
  });

  return {
    x,
    y,
    showMenu,
    songID,
    playlistID,
    songTitle,
    renameID,
    whichMenu,
    clickedOrderID,
    song,
  };
}
