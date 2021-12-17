import { combineReducers } from "redux";

const profile = (state = [], action) => {
  switch (action.type) {
    case "LOGIN":
      let copy = { ...state, ...action.value };
      return copy;
      break;
    case "LOGOUT":
      console.log(state);
      let userProfile = { ...state };
      userProfile = action.value;
      return userProfile;
      break;
    default:
      return state;
  }
};

const volume = (state = null) => state;

const playlists = (state = [], action) => {
  switch (action.type) {
    case "LOGOUT":
      let resetPlaylists = [];
      return resetPlaylists;
      break;
    case "GET_ALL":
      let playlistsCopy = [...state];
      playlistsCopy = action.value;
      return playlistsCopy;
      break;
    case "GET_ONE":
      let playlistsState = [...state, action.value];
      return playlistsState;
      break;
    case "GET_SONGS":
      let playlistCopy = [...state];
      return playlistCopy;
      break;
    case "DELETE_PLAYLIST":
      let newPlaylistCopy = [...state];
      for (let i = 0; i < newPlaylistCopy.length; i++) {
        if (
          parseInt(newPlaylistCopy[i].playlistID) === parseInt(action.value)
        ) {
          newPlaylistCopy.splice(i, 1);
        }
      }
      return newPlaylistCopy;
      break;
    case "RENAME_PLAYLIST":
      let anotherPlaylistCopy = [...state];
      for (let i = 0; i < anotherPlaylistCopy.length; i++) {
        if (
          parseInt(anotherPlaylistCopy[i].playlistID) ===
          parseInt(action.value.playlistID)
        ) {
          anotherPlaylistCopy[i].title = action.value.title;
          break;
        }
      }
      return anotherPlaylistCopy;
      break;
    case "LOGOUT":
      let wipedState = { ...state };
      wipedState = {};
      return state;
      break;
    default:
      return state;
  }
};

const serverResponse = (state = [], action) => {
  switch (action.type) {
    case "SET":
      let serverResponseCopy = { ...state, ...action.value };
      return serverResponseCopy;
      break;
    default:
      return state;
  }
};

const deletePlaylist = (state = [], action) => {
  switch (action.type) {
    case "SHOW_MENU":
      let deletePlaylistCopy = { ...state };
      deletePlaylistCopy = action.value;
      return deletePlaylistCopy;
      break;
    case "RESET_MENU":
      let deleteMenuCopy = { ...state };
      deleteMenuCopy = action.value;
      return deleteMenuCopy;
      break;
    default:
      return state;
  }
};

const currentSong = (state = [], action) => {
  switch (action.type) {
    case "PLAY_SONG":
      let stateCopy = { state };
      stateCopy = action.value;
      return stateCopy;
      break;
    case "MARK_PLAYED":
      let songCopy = { ...state };
      songCopy.played = true;
      return songCopy;
      break;
    default:
      return state;
  }
};

const songQueue = (state = [], action) => {
  switch (action.type) {
    case "ADD_QUEUE":
      let copy = state;
      copy = [action.value];
      return copy;
      break;
    case "RESET_QUEUE": {
      let stateCopy = state;
      stateCopy = [];
      console.log(stateCopy);
      return stateCopy;
      break;
    }
    default:
      return state;
  }
};

const autoQueue = (state = [], action) => {
  switch (action.type) {
    case "PUSH_QUEUE":
      let copy = state;
      copy = action.value;
      return copy;
      break;
    case "DELETE_FROM_QUEUE":
      let queueCopy = [...state];
      let newArray = [];
      console.log(queueCopy);
      queueCopy.forEach((row) => {
        if (row.playlistID) {
          if (row.orderID != action.value.orderID) {
            newArray.push(row);
          }
        } else if (row.tracknum) {
          if (row.tracknum != action.value.tracknum) {
            newArray.push(row);
          }
        }
      });
      return newArray;
    default:
      return state;
  }
};

const likedSongs = (state = null) => state;

export default combineReducers({
  profile,
  volume,
  playlists,
  likedSongs,
  serverResponse,
  deletePlaylist,
  currentSong,
  songQueue,
  autoQueue,
});
