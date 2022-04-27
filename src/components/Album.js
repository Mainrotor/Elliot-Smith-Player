import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoTimeOutline } from "react-icons/io5";
import ContextMenu from "../containers/ContextMenu.js";
import useRightClick from "../hooks/useRightClick";
import AlbumSong from "../containers/AlbumSong.js";

const Album = (props) => {
  const [albumInfo, setAlbumInfo] = useState({
    albumTitle: "",
    artistName: "",
    releaseYear: "",
    albumArtPath: "",
    trackCount: 0,
    albumLength: 0,
  });

  const [albumLength, setAlbumLength] = useState({
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [totalHours, setTotalHours] = useState(0);
  const [totalMinutes, setTotalMinutes] = useState(0);
  const [totalSeconds, setTotalSeconds] = useState(0);

  const [albumSongs, setAlbumSongs] = useState([]);

  const [albumArtPath, setAlbumArtPath] = useState("");

  const [deviceSize, setDeviceSize] = useState(window.innerWidth);

  window.addEventListener("resize", () => {
    setDeviceSize(window.innerWidth);
  });

  const { x, y, showMenu, songID, whichMenu, clickedSongID, song } =
    useRightClick();

  const updateHook = (data) => {
    props.setServerResponse(data.success);
  };

  const checkContextMenu = () => {
    if (whichMenu === "album-song") {
      return (
        <ContextMenu
          x={x}
          y={y}
          songCount={albumSongs.length}
          showMenu={showMenu}
          songID={songID}
          albumID={props.match.params.albumID}
          type={"album-song"}
          song={song}
          albumSongs={albumSongs}
          albumArtPath={albumInfo.albumArtPath}
          updateHook={updateHook}
        />
      );
    }
  };

  useEffect(() => {
    console.log(props.match.params.albumID);
    const getOptions = {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
      },
    };
    fetch(
      `https://reach-server.vercel.app/albums/getAlbum/${props.match.params.albumID}`,
      getOptions
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.success === "album-not-found") {
          console.log("album not found");
        } else {
          setAlbumInfo(data.albumInfo);
          setAlbumSongs(data.songs);
        }
      });
  }, [props.match.params.albumID]);

  useEffect(() => {
    if (albumInfo.albumArtPath) {
      async function importFile() {
        const file = await import(`../media/${albumInfo.albumArtPath}.jpg`);
        setAlbumArtPath(file.default);
      }
      importFile();
    }
  }, [albumInfo]);

  useEffect(() => {
    if (albumSongs) {
      let totalSecondsLocal = 0;
      let totalMinutesLocal = 0;
      let totalHoursLocal = 0;
      albumSongs.forEach((song) => {
        totalSecondsLocal += song.trackLength;
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
        console.log(totalSecondsLocal);
        console.log(totalMinutesLocal);
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
  }, [albumSongs]);

  const mobileChecker = () => {
    if (deviceSize > 900) {
      return (
        <div id="albumText">
          <h3>ALBUM</h3>
          <h1 id="albumTitle">{albumInfo.albumTitle}</h1>
          <div id="albumInfo">
            <p>
              {albumInfo.artistName} &#8226; {albumInfo.releaseYear} &#8226;{" "}
              {albumInfo.trackCount} songs,{" "}
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
        <div id="mobileAlbumText">
          <h1>{albumInfo.albumTitle}</h1>
          <p>
            Album &#8226; {albumInfo.releaseYear} &#8226; {albumInfo.trackCount}{" "}
            songs
          </p>
        </div>
      );
    }
  };

  return (
    <div id="albumCont">
      {checkContextMenu()}
      <div id="album">
        <header id="albumHead">
          <div id="albumImgCont">
            <div id="albumImg">
              <img
                src={albumArtPath}
                style={{ width: "200px", height: "200px" }}
              ></img>
            </div>
          </div>
          {mobileChecker()}
        </header>
        <div id="albumBody">
          <div id="albumTable">
            <div id="albumTableHead">
              <div id="songOrderCol">#</div>
              <div id="songTitleCol">TITLE</div>
              <div>
                <IoTimeOutline style={{ width: "20px", height: "20px" }} />
              </div>
            </div>
            <div id="albumTableBody">
              {albumSongs.map((song) => {
                return (
                  <AlbumSong
                    clickedSongID={clickedSongID}
                    song={song}
                    song_ID={song.songID}
                    key={albumSongs.indexOf(song)}
                    index={albumSongs.indexOf(song)}
                    showMenu={showMenu}
                    albumArtPath={albumInfo.albumArtPath}
                    albumid={props.match.params.albumID}
                    albumSongs={albumSongs}
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

export default Album;
