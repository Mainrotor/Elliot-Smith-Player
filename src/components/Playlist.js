import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import PlaylistSong from "../containers/PlaylistSong.js";
import ContextMenu from "../containers/ContextMenu.js";
import useRightClick from "../hooks/useRightClick";
import { IoTimeOutline } from "react-icons/io5";

const Playlist = (props) => {
  const [songs, setSongs] = useState([]);
  const [totalHours, setTotalHours] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);
  const [playlist, setPlaylist] = useState({});
  const { x, y, showMenu, songID, whichMenu, clickedOrderID, albumID, song } =
    useRightClick();

  const [deviceSize, setDeviceSize] = useState(window.innerWidth);

  window.addEventListener("resize", () => {
    setDeviceSize(window.innerWidth);
  });

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
          albumID={albumID}
          song={song}
          playlistSongs={songs}
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

  useEffect(() => {
    if (songs) {
      let totalSecondsLocal = 0;
      let totalMinutesLocal = 0;
      let totalHoursLocal = 0;
      songs.forEach((song) => {
        totalSecondsLocal += song.track_length;
      });
      if (totalSecondsLocal < 3600) {
        setTotalHours(0);
        let time = new Date(totalSecondsLocal * 1000)
          .toISOString()
          .substr(14, 5);
        time = time.split(":");
        totalSecondsLocal = time[1].split("");
        totalMinutesLocal = time[0].split("");
        if (totalSecondsLocal[0] === "0") {
          totalSecondsLocal.splice(0, 1);
        }
        if (totalMinutesLocal[0] === "0") {
          totalMinutesLocal.splice(0, 1);
        }
        totalMinutesLocal = totalMinutesLocal.join("");
        totalSecondsLocal = totalSecondsLocal.join("");
        setTotalMinutes(totalMinutesLocal);
        setTotalSeconds(totalSecondsLocal);
      } else if (totalSecondsLocal > 3600) {
        let time = new Date(totalSecondsLocal * 1000)
          .toISOString()
          .substr(11, 8);
        time = time.split(":");
        totalSecondsLocal = time[2].split("");
        totalMinutesLocal = time[1].split("");
        totalHoursLocal = time[0].split("");
        if (totalSecondsLocal[0] === "0") {
          totalSecondsLocal.splice(0, 1);
        }
        if (totalMinutesLocal[0] === "0") {
          totalMinutesLocal.splice(0, 1);
        }
        if (totalHoursLocal[0] === "0") {
          totalHoursLocal.splice(0, 1);
        }
        totalMinutesLocal = totalMinutesLocal.join("");
        totalSecondsLocal = totalSecondsLocal.join("");
        totalHoursLocal = totalHoursLocal.join("");
        console.log(totalHoursLocal);
        setTotalMinutes(totalMinutesLocal);
        setTotalSeconds(totalSecondsLocal);
        setTotalHours(totalHoursLocal);
      }
    }
  }, [songs]);

  useEffect(() => {
    if (
      props.playlists.find(
        (playlist) => playlist.playlistID == parseInt(props.match.params.id)
      )
    ) {
      setPlaylist(
        props.playlists.find(
          (playlist) => playlist.playlistID == parseInt(props.match.params.id)
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
        .then((data) => {
          setPlaylist({ username: data[0].username, title: data[0].title });
          console.log(data);
        });
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
      .then((data) => {
        setSongs(data);
      });
  }, [props.match.params.id]);

  const mobileChecker = () => {
    if (deviceSize > 900) {
      return (
        <div id="playlistText">
          <h3>PLAYLIST</h3>
          <h1 id="playlistTitle">{playlist.title}</h1>
          <div id="playlistInfo">
            <p>
              {playlist.username} &#8226; {songs.length} songs,{" "}
              {() => {
                if (totalHours > 0) {
                  return `${totalHours} hours`;
                }
              }}{" "}
              {totalMinutes} minutes {totalSeconds} seconds
            </p>
          </div>
        </div>
      );
    } else {
      return (
        <div id="mobilePlaylistText">
          <h1>{playlist.title}</h1>
          <p>Playlist &#8226; {songs.length} songs</p>
        </div>
      );
    }
  };

  return (
    <div id="playlistCont">
      {checkContextMenu()}
      <div id="playlist">
        <header id="playlistHead">
          <div id="playlistImgCont">
            <div id="playlistImg"></div>
          </div>
          {mobileChecker()}
        </header>
        <div id="playlistBody">
          <div id="playlistTable">
            <div id="playlistTableHead">
              <div id="songOrderCol">#</div>
              <div>TITLE</div>
              <div>LENGTH</div>
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
                    playlistid={props.match.params.id}
                    playlistSongs={songs}
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
