import {connect} from 'react-redux';
import { resetDeleteMenu, setServerResponse } from '../redux/actions.js';
import { deletePlaylist } from '../redux/actions.js';
import state from "../redux/state.js";
import DeletePlaylist from '../components/DeletePlaylist.js';

const mapStateToProps = (state) => {
    return {
        deletePlaylistState : state.deletePlaylist,
        profile : state.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      resetDeleteMenu: () => dispatch(resetDeleteMenu()),
      deletePlaylist: (playlist) => dispatch(deletePlaylist(playlist)),
      setServerResponse: (serverResponse) => dispatch(setServerResponse(serverResponse)),
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(DeletePlaylist, resetDeleteMenu, deletePlaylist, setServerResponse);