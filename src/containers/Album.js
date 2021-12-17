import { connect } from "react-redux";
import Album from "../components/Album.js";
import { setServerResponse } from "../redux/actions.js";

const mapStateToProps = (state) => {
  return {
    playlists: state.playlists,
    profile: state.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setServerResponse: (serverResponse) =>
      dispatch(setServerResponse(serverResponse)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  Album,
  setServerResponse
);
