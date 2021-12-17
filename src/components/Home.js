import RecommendedSong from "../containers/RecommendedSong";
import React, { useState, useEffect, useRef } from "react";
import ContextMenu from "../containers/ContextMenu.js";
import Status from "../components/Status.js";
import useRightClick from "../hooks/useRightClick";
import ElliotBanner from "../media/elliot_banner.jpg";
import ElliotSmithLaundromat from "../media/elliot_smith_bed.webp";

const Home = (props) => {
  let ref = useRef();
  const { x, y, showMenu, songID, whichMenu, song, albumID } = useRightClick();
  const [songs, setSongs] = useState([
    {
      albumID: 2,
      album_art_path: "elliot_smith",
      path: "clementine",
      song_id: 16,
      song_name: "Clementine",
      track_length: 168,
      track_num: 3,
    },
    {
      albumID: 1,
      album_art_path: "either_or",
      path: "ballad_of_big_nothing",
      song_id: 3,
      song_name: "Ballad Of Big Nothing",
      track_length: 218,
      track_num: 3,
    },
    {
      albumID: 2,
      album_art_path: "elliot_smith",
      path: "the_biggest_lie",
      song_id: 25,
      song_name: "The Biggest Lie",
      track_length: 252,
      track_num: 12,
    },
    {
      albumID: 2,
      album_art_path: "elliot_smith",
      path: "the_biggest_lie",
      song_id: 26,
      song_name: "The Biggest Lie",
      track_length: 252,
      track_num: 12,
    },
  ]);

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
          type={whichMenu}
          song={song}
          albumID={albumID}
          updateHook={updateHook}
        />
      );
    }
  };

  return (
    <div id="homeWrap">
      {checkContextMenu()}
      <div id="homeBanner">
        <img src={ElliotBanner}></img>
      </div>
      {/* <h1 id="homeWrapTitle">Recommended Sad Bops</h1> */}
      <div id="recommendedTracks" ref={ref}>
        {songs.map((song) => {
          return (
            <RecommendedSong
              song={song}
              key={song.song_id}
              songID={song.songID}
              showMenu={showMenu}
            />
          );
        })}
      </div>
      <div id="aboutElliotContainer">
        <h1 id="aboutElliotTitle">About Elliot</h1>
        <div id="aboutElliotContent">
          <div id="aboutElliotImg">
            <img src={ElliotSmithLaundromat} id="elliotSmithLaundromat" />
          </div>
          <div id="aboutElliotPara">
            <p id="topPara">
              Elliot Smith was a indie/folk songwriter releasing music
              independently from 1994-2000. Dying at 34 years old from
              presumably self-inflicted stab wounds, Elliot left behind a legacy
              of intensely creative songwriting and emotionally candid lyricism.
            </p>
            <p>
              Complex acoustic guitar lines, whispery double-tracked vocals, and
              keen visual metaphors, characterize Elliot’s early albums. These
              elements create a listening experience that feels intimate–like
              Elliot is playing just for you. I think you'll find that his
              lyrics are rife with his understanding that he has never belonged.
              But, delivered alongside his poignant acceptance of defeat, is his
              refreshing sense of humor.
            </p>
            <p>
              Elliot shows you a character who doesn’t belong, and because we’ve
              all felt that way at times, it’s easy to feel comforted by his
              lyrics. I think you’ll find that while the subject is often
              morose, Elliot’s attitude is playful.
            </p>
            <p>
              For copyright reasons, all of the tracks on these albums are from
              live performances.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
