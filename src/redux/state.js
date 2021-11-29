let state = {
  profile: {
    username: "",
    userID: 0,
    accessToken: "",
    loggedIn: false,
  },
  songQueue: [],
  currentSong: {},
  songHistory: [],
  playlists: [],
  likedSongs: [],
  volume: 50,
  serverResponse: { success: "" },
  deletePlaylist: {
    show: false,
    id: 0,
    title: "",
  },
};

export default state;
