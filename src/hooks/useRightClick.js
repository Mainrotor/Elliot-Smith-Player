import { useState, useEffect } from "react";

export default function useRightClick() {
  const [x, setX] = useState(0);
  const [y, setY] = useState(0);
  const [songID, setSongID] = useState(0);
  const [albumID, setAlbumID] = useState(0);
  const [songTitle, setSongTitle] = useState("");
  const [showMenu, setShowMenu] = useState(false);
  const [playlistID, setPlaylistID] = useState(0);
  const [renameID, setRenameID] = useState(0);
  const [whichMenu, setWhichMenu] = useState("");
  const [clickedOrderID, setClickedOrderID] = useState(0);
  const [clickedSongID, setClickedSongID] = useState(0);
  const [clickedTrackNum, setClickedTrackNum] = useState(0);
  const [song, setSong] = useState({});

  const handleContextMenu = (e) => {
    let playlistSongRow = document.getElementsByClassName("playlistSongRow");
    let recommendedTracks = document.getElementById("recommendedTracks");
    let recommendedSongRow =
      document.getElementsByClassName("recommendedSongRow");
    let albumSongRow = document.getElementsByClassName("albumSongRow");
    let searchResults = document.getElementById("searchResults");
    let songRow = document.getElementsByClassName("songRow");
    let playlistLink = document.getElementsByClassName("playlistLink");
    let playlistsContainer = document.getElementById("playlists");
    let playlistTable = document.getElementById("playlistBody");
    let albumTable = document.getElementById("albumBody");
    let body = document.getElementById("mainWrap");
    let vw = body.clientWidth;
    let vh = body.clientHeight;

    if (searchResults) {
      if (searchResults.contains(e.target)) {
        setShowMenu(false);
        for (let i = 0; i < songRow.length; i++) {
          if (songRow[i].contains(e.target) || songRow[i] === e.target) {
            e.preventDefault();
            if (e.pageX + 180 > vw) {
              console.log(vw);
              let diff = e.pageX + 190 - vw;
              setX(e.pageX - diff);
            } else {
              setX(e.pageX);
            }
            setY(e.pageY);
            var regex = /\d+/g;
            let stringSongID = songRow[i].id.match(regex);
            setSongID(parseInt(stringSongID));
            setAlbumID(songRow[i].attributes.albumid.value);
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
    if (recommendedTracks) {
      if (recommendedTracks.contains(e.target)) {
        setShowMenu(false);
        for (let i = 0; i < recommendedSongRow.length; i++) {
          if (
            recommendedSongRow[i].contains(e.target) ||
            recommendedSongRow[i] === e.target
          ) {
            console.log("yes@!@@");
            e.preventDefault();
            if (e.pageX + 180 > vw) {
              console.log(vw);
              let diff = e.pageX + 190 - vw;
              setX(e.pageX - diff);
            } else {
              setX(e.pageX);
            }
            if (e.pageY + 190 > vh) {
              let diff = e.pageY + 200 - vh;
              setY(e.pageY - diff);
            } else {
              setY(e.pageY);
            }
            var regex = /\d+/g;
            let stringSongID = recommendedSongRow[i].id.match(regex);
            setSongID(parseInt(stringSongID));
            setAlbumID(recommendedSongRow[i].attributes.albumid.value);
            setShowMenu(true);
            setSong({
              songID: parseInt(stringSongID[0]),
              songpath: recommendedSongRow[i].attributes.songpath.value,
              albumartpath: recommendedSongRow[i].attributes.albumartpath.value,
              songtitle: recommendedSongRow[i].attributes.songTitle.value,
              tracklength: parseInt(
                recommendedSongRow[i].attributes.trackLength.value
              ),
              artistname: recommendedSongRow[i].attributes.artistname.value,
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
            if (e.pageX + 180 > vw) {
              console.log(vw);
              let diff = e.pageX + 190 - vw;
              setX(e.pageX - diff);
            } else {
              setX(e.pageX);
            }
            if (e.pageY + 190 > vh) {
              let diff = e.pageY + 200 - vh;
              setY(e.pageY - diff);
            } else {
              setY(e.pageY);
            }
            var regex = /\d+/g;
            let stringSongID = playlistSongRow[i].id.match(regex);
            setSong({
              songID: parseInt(stringSongID[0]),
              songpath: playlistSongRow[i].attributes.songpath.value,
              albumartpath: playlistSongRow[i].attributes.albumartpath.value,
              songtitle: playlistSongRow[i].attributes.songTitle.value,
              tracklength: parseInt(
                playlistSongRow[i].attributes.trackLength.value
              ),
              artistname: playlistSongRow[i].attributes.artistname.value,
            });
            setSongID(playlistSongRow[i].attributes.songid.value);
            console.log(playlistSongRow[i].attributes.albumid.value);
            setAlbumID(playlistSongRow[i].attributes.albumid.value);
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

    if (albumTable) {
      if (albumTable.contains(e.target)) {
        setShowMenu(false);
        for (let i = 0; i < albumSongRow.length; i++) {
          if (
            albumSongRow[i].contains(e.target) ||
            albumSongRow[i] === e.target
          ) {
            e.preventDefault();
            if (e.pageX + 180 > vw) {
              console.log(vw);
              let diff = e.pageX + 190 - vw;
              setX(e.pageX - diff);
            } else {
              setX(e.pageX);
            }
            if (e.pageY + 190 > vh) {
              let diff = e.pageY + 200 - vh;
              setY(e.pageY - diff);
            } else {
              setY(e.pageY);
            }
            setSong({
              songID: albumSongRow[i].attributes.songid.value,
              songpath: albumSongRow[i].attributes.songpath.value,
              albumartpath: albumSongRow[i].attributes.albumartpath.value,
              songtitle: albumSongRow[i].attributes.songTitle.value,
              tracklength: parseInt(
                albumSongRow[i].attributes.trackLength.value
              ),
              artistname: albumSongRow[i].attributes.artistname.value,
              tracknum: albumSongRow[i].attributes.tracknum.value,
            });
            setSongID(albumSongRow[i].attributes.songid.value);
            setShowMenu(true);
            setWhichMenu("album-song");
            setClickedSongID(albumSongRow[i].attributes.songid.value);
            break;
          }
        }
      }
    }
  };

  const handleClick = (e) => {
    let visibleContextMenu =
      document.getElementsByClassName("visibleContextMenu");
    if (visibleContextMenu) {
      var clickedVisibleContextMenu = [0]; //serves to store memory if clicked on or inside of visibleContextMenu
      for (let i = 0; i < visibleContextMenu.length; i++) {
        //looping through all of the instances of class visibleContextMenu
        if (
          visibleContextMenu[i].contains(e.target) ||
          e.target.className.baseVal === "visibleContextMenu"
        ) {
          clickedVisibleContextMenu.splice(0, 1, 1); //if clicked on or inside visibleContextMenu set
        }
      }
      if (clickedVisibleContextMenu[0] === 0) {
        setShowMenu(false);
        setPlaylistID(0);
        setClickedOrderID(0);
        setAlbumID(0);
      }
      clickedVisibleContextMenu.splice(0, 1, 0); //reset back to default
    } else {
      setShowMenu(false);
      setPlaylistID(0);
      setClickedOrderID(0);
      setClickedSongID(0);
      setAlbumID(0);
    }
  };

  useEffect(() => {
    document.addEventListener("click", handleClick);
    let visibleContextMenu =
      document.getElementsByClassName("visibleContextMenu");
    if (visibleContextMenu) {
      for (let i = 0; i < visibleContextMenu.length; i++) {
        visibleContextMenu[i].addEventListener("click", handleContextMenu);
      }
    }
    document.addEventListener("contextmenu", handleContextMenu);

    return () => {
      // document.removeEventListener("click", handleClick);
      document.removeEventListener("contextmenu", handleContextMenu);
      document.removeEventListener("click", handleClick);
      if (visibleContextMenu) {
        for (let i = 0; i < visibleContextMenu.length; i++) {
          visibleContextMenu[i].removeEventListener("click", handleContextMenu);
        }
      }
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
    clickedSongID,
    song,
    albumID,
  };
}
