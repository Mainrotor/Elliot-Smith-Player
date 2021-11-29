import { connect } from "react-redux";
import AudioPlayer from "../components/AudioPlayer.js";
import { playSong } from "../redux/actions.js";
import state from "../redux/state.js";

const mapStateToProps = (state) => {
  return {
    playlists: state.playlists,
    profile: state.profile,
    currentSong: state.currentSong,
    songQueue: state.songQueue,
    state: state,
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
    ) =>
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
      ),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  AudioPlayer,
  playSong
);
