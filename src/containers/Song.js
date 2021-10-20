import { connect } from "react-redux";
import Song from "../components/Song.js";
import { likeSong } from "../redux/actions.js";

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
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Song);
