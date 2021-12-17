import { connect } from "react-redux";
import Home from "../components/Home.js";
import { setServerResponse } from "../redux/actions.js";

const mapStateToProps = (state) => {
  return {
    serverResponse: state.serverResponse,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    setServerResponse: (serverResponse) =>
      dispatch(setServerResponse(serverResponse)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  Home,
  setServerResponse
);
