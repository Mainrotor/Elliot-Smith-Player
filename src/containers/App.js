import { connect } from "react-redux";

import App from "../App.js";

const mapStateToProps = (state) => {
  return {
    loggedIn: state.loggedIn,
  };
};

export default connect(mapStateToProps)(App);
