import { connect } from "react-redux";
import PlaylistSong from "../components/PlaylistSong.js";
import { likeSong } from "../redux/actions.js";
import { playSong } from "../redux/actions.js";

const mapStateToProps = (state) => {
  return {
    likedSongs: state.likedSongs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    likeSong: (songID) => {
      dispatch(likeSong(songID));
    },
    playSong: (
      songID,
      songpath,
      albumartpath,
      songtitle,
      tracklength,
      artistname,
      playlistID,
      orderID
    ) => {
      dispatch(
        playSong(
          songID,
          songpath,
          albumartpath,
          songtitle,
          tracklength,
          artistname,
          playlistID,
          orderID
        )
      );
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  PlaylistSong,
  playSong
);
