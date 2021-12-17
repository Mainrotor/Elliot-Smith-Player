import { connect } from "react-redux";
import RecommendedSong from "../components/RecommendedSong.js";
import { playSong } from "../redux/actions.js";

const mapStateToProps = (state) => {
  return {
    likedSongs: state.likedSongs,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
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
  RecommendedSong,
  playSong
);
