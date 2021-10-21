import { connect } from "react-redux";

import Navigation from "../components/Navigation.js";
import state from "../redux/state.js";

const mapStateToProps = () => {
  return {
    playlists: state.playlists,
    likedSongs: state.likedSongs,
    profile: state.profile,
  };
};

export default connect(mapStateToProps)(Navigation);
