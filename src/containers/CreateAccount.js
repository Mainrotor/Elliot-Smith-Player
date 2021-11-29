import { connect } from "react-redux";
import CreateAccount from "../components/CreateAccount.js";
import { setServerResponse } from "../redux/actions.js";

const mapStateToProps = (state) => {
  return {
    profile: state.profile,
    playlists: state.playlists,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setServerResponse: (serverResponse) =>
      dispatch(setServerResponse(serverResponse)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  CreateAccount,
  setServerResponse
);
