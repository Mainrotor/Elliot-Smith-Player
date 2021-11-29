import { connect } from "react-redux";
import Playlist from "../components/Playlist.js";
import { fetchPlaylistSongs } from "../redux/actions.js";
import { setServerResponse } from "../redux/actions.js";

const mapStateToProps = (state) => {
    return {
        playlists : state.playlists,
        profile : state.profile
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
      fetchPlaylistSongs: (songs, playlistID) => dispatch(fetchPlaylistSongs(songs, playlistID)),
      setServerResponse: (serverResponse) => dispatch(setServerResponse(serverResponse))
    };
  };

export default connect(mapStateToProps, mapDispatchToProps)(Playlist, fetchPlaylistSongs, setServerResponse);