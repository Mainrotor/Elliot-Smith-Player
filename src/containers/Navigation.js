import { connect } from "react-redux";
import { setServerResponse } from "../redux/actions.js";
import { getPlaylist } from "../redux/actions.js";
import Navigation from "../components/Navigation.js";
import state from "../redux/state.js";

const mapStateToProps = (state) => {
  return {
    playlists: state.playlists,
    likedSongs: state.likedSongs,
    profile: state.profile,
    currentSong: state.currentSong,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setServerResponse: (serverResponse) => dispatch(setServerResponse(serverResponse)),
    getPlaylist: (playlist) => dispatch(getPlaylist(playlist)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Navigation, setServerResponse, getPlaylist);
