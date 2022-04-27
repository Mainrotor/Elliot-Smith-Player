import { connect } from "react-redux";
import MobileAudioPlayer from "../components/MobileAudioPlayer.js";
import { playSong } from "../redux/actions.js";
import { pushAutoQueue } from "../redux/actions.js";
import { resetAutoQueue } from "../redux/actions.js";
import { removeFromAutoQueue } from "../redux/actions.js";
import { resetQueue } from "../redux/actions.js";
import { setServerResponse } from "../redux/actions.js";
import state from "../redux/state.js";

const mapStateToProps = (state) => {
  return {
    playlists: state.playlists,
    profile: state.profile,
    autoQueue: state.autoQueue,
    currentSong: state.currentSong,
    songQueue: state.songQueue,
    state: state,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    pushAutoQueue: (songs) => dispatch(pushAutoQueue(songs)),
    resetAutoQueue: (songs) => dispatch(resetAutoQueue(songs)),
    resetQueue: () => dispatch(resetQueue()),
    removeFromAutoQueue: (song) => dispatch(removeFromAutoQueue(song)),
    setServerResponse: (serverResponse) =>
      dispatch(setServerResponse(serverResponse)),
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
  MobileAudioPlayer,
  playSong,
  pushAutoQueue,
  resetAutoQueue,
  removeFromAutoQueue,
  resetQueue,
  setServerResponse
);
