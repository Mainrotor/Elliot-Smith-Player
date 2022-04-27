import { connect } from "react-redux";
import { logout } from "../redux/actions.js";
import { setServerResponse } from "../redux/actions.js";
import { getPlaylist } from "../redux/actions.js";
import Header from "../components/Header.js";
import state from "../redux/state.js";

const mapStateToProps = (state) => {
  return {
    username: state.profile.username,
    loggedIn: state.profile.loggedIn,
    profile: state.profile,
    playlists: state.playlists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
    setServerResponse: (serverResponse) =>
      dispatch(setServerResponse(serverResponse)),
    getPlaylist: (playlist) => dispatch(getPlaylist(playlist)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  Header,
  setServerResponse,
  getPlaylist
);
