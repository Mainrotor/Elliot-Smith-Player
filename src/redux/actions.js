export const login = (profile) => {
  return {
    type: "LOGIN",
    value: {
      username: profile.username,
      userID: profile.userID,
      accessToken: profile.accessToken,
      loggedIn: true,
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
