import { connect } from "react-redux";
import AlbumSong from "../components/AlbumSong.js";
import { likeSong } from "../redux/actions.js";
import { playSong } from "../redux/actions.js";
import { pushAutoQueue } from "../redux/actions.js";
import { resetAutoQueue } from "../redux/actions.js";

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
    pushAutoQueue: (songs) => dispatch(pushAutoQueue(songs)),
    resetAutoQueue: (songs) => dispatch(resetAutoQueue(songs)),
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
  AlbumSong,
  pushAutoQueue,
  playSong,
  resetAutoQueue
);
