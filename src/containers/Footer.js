import { connect } from "react-redux";
import { setServerResponse } from "../redux/actions.js";
import { getPlaylist } from "../redux/actions.js";
import Footer from "../components/Footer.js";
import state from "../redux/state.js";

const mapStateToProps = (state) => {
  return {
    playlists: state.playlists,
    profile: state.profile,
    currentSong: state.currentSong,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setServerResponse: (serverResponse) =>
      dispatch(setServerResponse(serverResponse)),
    getPlaylist: (playlist) => dispatch(getPlaylist(playlist)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  Footer,
  setServerResponse,
  getPlaylist
);
