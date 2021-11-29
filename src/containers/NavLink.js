import { connect } from "react-redux";
import NavLink from '../components/NavLink.js';
import { renamePlaylist } from '../redux/actions.js';
import { setServerResponse } from "../redux/actions.js";
import state from "../redux/state.js";

const mapStateToProps = (state) => {
    return {
        playlists : state.playlists,
        profile : state.profile,
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        renamePlaylist: (playlist, title) => dispatch(renamePlaylist(playlist, title)),
        setServerResponse: (serverResponse) => dispatch(setServerResponse(serverResponse)),
    };
  }; 

export default connect(mapStateToProps, mapDispatchToProps)(NavLink, renamePlaylist, setServerResponse);