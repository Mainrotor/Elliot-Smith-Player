import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PlaylistSong from "../containers/PlaylistSong.js";
import ContextMenu from "../containers/ContextMenu.js";
import useRightClick from "../hooks/useRightClick";

const Playlist = (props) => {
  const [songs, setSongs] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [playlist, setPlaylist] = useState({});
  const { x, y, showMenu, songID, whichMenu, clickedOrderID } = useRightClick();

  const checkContextMenu = () => {
    if (whichMenu === "playlist-song") {
      return (
        <ContextMenu
          x={x}
          y={y}
          deleteSong={deleteSong}
          songCount={songs.length}
          orderID={clickedOrderID}
          showMenu={showMenu}
          songID={songID}
          playlistID={props.match.params.id}
          userID={props.profile.userID}
          updateHook={updateHook}
          type={"playlist-song"}
        />
      );
    }
  };

  const deleteSong = async (orderID, songID) => {
    let stateCopy = songs;
    stateCopy = stateCopy.filter(
      (song) => parseInt(song.orderID) !== parseInt(orderID)
    );

    setSongs(stateCopy);

    for (let i = 0; i < stateCopy.length; i++) {
      if (stateCopy[i].orderID > orderID) {
        stateCopy[i].orderID -= 1;
      }
    }

    let payload = {
      userID: parseInt(props.match.params.userID),
      orderID: orderID,
      songID: songID,
      playlistID: props.match.params.id,
    };

    const requestOptions = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        authorization: `Bearer ${props.profile.accessToken}`,
      },
      body: JSON.stringify(payload),
    };

    await fetch(
      `https://reach-server.vercel.app/playlists/deleteSong/${songID}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        props.setServerResponse(data.success);
      });
  };

  const updateHook = (data) => {
    props.setServerResponse(data.success);
  };

  let totalTimeCounter = () => {
    let totalSecondsLocal = 0;
    let totalMinutesLocal = 0;
    let totalHoursLocal = 0;
    songs.forEach((song) => {
      return (totalSecondsLocal += song.track_length);
    });
    setTotalSeconds(totalSecondsLocal);
    console.log(
      totalHoursLocal +
        " hours " +
        totalMinutesLocal +
        " minutes " +
        totalSecondsLocal +
        " seconds"
    );
  };

  useEffect(() => {
    if (
      props.playlists.find(
        (playlist) => playlist.playlistID == parseInt(props.match.params.id)
      )
    ) {
      setPlaylist(
        props.playlists.find(
          (playlist) => playlist.playlistID == parseInt(props.match.params.id),
          console.log(playlist)
        )
      );
    } else {
      const getOptions = {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Accept: "*/*",
        },
      };
      fetch(
        `https://reach-server.vercel.app/playlists/getPlaylist/${props.match.params.id}/${props.match.params.userID}`,
        getOptions
      )
        .then((response) => response.json())
        .then((data) => [
          setPlaylist({ username: data[0].username, title: data[0].title }),
          console.log(data),
        ]);
    }

    const getOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    };
    fetch(
      `https://reach-server.vercel.app/playlists/getPlaylistsSongs/${props.match.params.id}`,
      getOptions
    )
      .then((response) => response.json())
      .then((data) => setSongs(data));
  }, [props.match.params.id]);

  return (
    <div id="playlistCont">
      {checkContextMenu()}
      <div id="playlist">
        <header id="playlistHead">
          <div id="playlistImgCont">
            <div id="playlistImg"></div>
          </div>
          <div id="playlistText">
            <h3>PLAYLIST</h3>
            <h1 id="playlistTitle">{playlist.title}</h1>
            <div id="playlistInfo">
              <p>
                {playlist.username} &#8226; {songs.length} songs, {totalHours}{" "}
                hours {totalMinutes} minutes {totalSeconds} seconds
              </p>
            </div>
          </div>
        </header>
        <div id="playlistBody">
          <div id="playlistTable">
            <div id="playlistTableHead">
              <div id="songOrderCol">#</div>
              <div>TITLE</div>
              <div>ALBUM</div>
              <div>DATE ADDED</div>
              <div>length</div>
            </div>
            <div id="playlistTableBody">
              {songs.map((song) => {
                return (
                  <PlaylistSong
                    song={song}
                    clickedOrderID={clickedOrderID}
                    key={songs.indexOf(song)}
                    index={songs.indexOf(song)}
                    totalMinutes={totalMinutes}
                    setTotalMinutes={setTotalMinutes}
                    showMenu={showMenu}
                  />
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Playlist;
