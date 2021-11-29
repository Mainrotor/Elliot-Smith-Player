import { connect } from "react-redux";

import { logout } from "../redux/actions.js";
import Header from "../components/Header.js";

const mapStateToProps = (state) => {
  return {
    username: state.profile.username,
    loggedIn: state.profile.loggedIn,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logout: () => {
      dispatch(logout());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
