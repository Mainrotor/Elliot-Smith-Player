export const login = (profile) => {
  return {
    type: "LOGIN",
    value: {
      username: profile.username,
      userID: profile.userID,
      accessToken: profile.accessToken,
      loggedIn: true,
      serverResponse: {},
    },
  };
};

export const logout = () => {
  return {
    type: "LOGOUT",
    value: {
      username: "",
      userID: "",
      accessToken: "",
      loggedIn: false,
    },
  };
};

export const likeSong = (song) => {
  return {
    type: "LIKE",
    value: {
      songID: song,
    },
  };
};

export const getPlaylists = (playlists) => {
  return {
    type: "GET_ALL",
    value: playlists,
  };
};

export const getPlaylist = (playlist) => {
  return {
    type: "GET_ONE",
    value: playlist,
  };
};

export const fetchPlaylistSongs = (songs, playlistID) => {
  return {
    type: "GET_SONGS",
    value: [songs, playlistID],
  };
};

export const setServerResponse = (serverResponse) => {
  return {
    type: "SET",
    value: { success: serverResponse },
  };
};

export const confirmDelete = (playlist, title) => {
  return {
    type: "SHOW_MENU",
    value: {
      show: true,
      id: playlist,
      title: title,
    },
  };
};

export const resetDeleteMenu = () => {
  return {
    type: "RESET_MENU",
    value: {
      show: false,
      id: 0,
      title: "",
    },
  };
};

export const deletePlaylist = (playlist) => {
  return {
    type: "DELETE_PLAYLIST",
    value: playlist,
  };
};

export const renamePlaylist = (playlistID, title) => {
  return {
    type: "RENAME_PLAYLIST",
    value: {
      playlistID: playlistID,
      title: title,
    },
  };
};

export const playSong = (
  songID,
  songpath,
  albumartpath,
  songtitle,
  tracklength,
  artistname,
  playlistID,
  orderID,
  albumID
) => {
  return {
    type: "PLAY_SONG",
    value: {
      played: false,
      songID: songID,
      songpath: songpath,
      albumartpath: albumartpath,
      songtitle: songtitle,
      tracklength: tracklength,
      artistname: artistname,
      playlistID: playlistID,
      orderID: orderID,
      albumID: albumID,
    },
  };
};

export const markPlayed = () => {
  return {
    type: "MARK_PLAYED",
    value: {
      played: true,
    },
  };
};

export const addToQueue = (song) => {
  return {
    type: "ADD_QUEUE",
    value: song,
  };
};

export const pushAutoQueue = (songs) => {
  return {
    type: "PUSH_QUEUE",
    value: songs,
  };
};

export const resetAutoQueue = () => {
  return {
    type: "RESET_QUEUE",
    value: {},
  };
};

export const removeFromAutoQueue = (song) => {
  return {
    type: "DELETE_FROM_QUEUE",
    value: song,
  };
};

export const resetQueue = () => {
  return {
    type: "RESET_QUEUE",
    value: {},
  };
};
