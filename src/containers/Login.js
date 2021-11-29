import { connect } from "react-redux";
import Login from "../components/Login.js";
import { login } from "../redux/actions.js";
import { getPlaylists } from "../redux/actions.js";
import { setServerResponse } from "../redux/actions.js";

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    playlists: state.playlists,  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    login: (profile) => dispatch(login(profile)),
    getPlaylists: (playlists) => dispatch(getPlaylists(playlists)),
    setServerResponse: (serverResponse) => dispatch(setServerResponse(serverResponse)) 
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  Login,
  getPlaylists,
  setServerResponse
);
