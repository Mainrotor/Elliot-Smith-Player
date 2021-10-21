import { combineReducers } from "redux";

const profile = (state = [], action) => {
  switch (action.type) {
    case "LOGIN":
      let copy = { ...state, ...action.value };
      console.log(copy);
      return copy;
      break;
    case "LOGOUT":
      let userProfile = { ...state };
      userProfile = { ...action.value };
      return userProfile;
      break;
    default:
      return state;
  }
};

const volume = (state = null) => state;

const playlists = (state = [], action) => {
  switch (action.type) {
    case "GET_ALL":
      let playlistCopy = [...state];
      playlistCopy = action.value;
      return playlistCopy;
      break;
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
});
