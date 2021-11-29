import { connect } from "react-redux";
import ContextMenu from "../components/ContextMenu.js";
import { resetDeleteMenu, setServerResponse } from "../redux/actions.js";
import { confirmDelete } from "../redux/actions.js";
import { playSong } from "../redux/actions.js";
import { addToQueue } from "../redux/actions.js";
import { resetQueue } from "../redux/actions.js";
import state from "../redux/state.js";

const mapStateToProps = (state) => {
  return {
    playlists: state.playlists,
    profile: state.profile,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    confirmDelete: (playlist, title) =>
      dispatch(confirmDelete(playlist, title)),
    resetDeleteMenu: () => dispatch(resetDeleteMenu()),
    playSong: (
      songID,
      songpath,
      albumartpath,
      songtitle,
      tracklength,
      artistname,
      playlistID,
      orderID
    ) =>
      dispatch(
        playSong(
          songID,
          songpath,
          albumartpath,
          songtitle,
          tracklength,
          artistname,
          playlistID,
          orderID
        )
      ),
    addToQueue: (song) => dispatch(addToQueue(song)),
    resetQueue: () => dispatch(resetQueue()),
    setServerResponse: (serverResponse) =>
      dispatch(setServerResponse(serverResponse)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(
  ContextMenu,
  resetDeleteMenu,
  confirmDelete,
  playSong,
  addToQueue,
  resetQueue,
  setServerResponse
);
