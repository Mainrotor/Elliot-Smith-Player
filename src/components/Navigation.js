import { Link } from "react-router-dom";

const Navigation = (props) => {
  const createPlaylist = async () => {
    console.log(props.profile);
    const requestOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        authorization: `Bearer ${props.profile.accessToken}`,
      },
      body: JSON.stringify({ title: "", userID: props.profile.userID }),
    };

    await fetch(
      "https://reach-server.vercel.app/users/createPlaylist",
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
      });
  };

  return (
    <section id="navContainer">
      <h2>Elliot Smith Player</h2>
      <div id="navLists">
        <ul id="nav">
          <li>
            <Link to="/Home" className="navLinks">
              Home
            </Link>
          </li>
          <li>
            <Link to="/Search" className="navLinks">
              Search
            </Link>
          </li>
          <li onClick={() => console.log(props.profile)}>console.log state</li>
          <li>Create Playlist</li>
        </ul>
        <ul id="playlists">
          {props.playlists.map((listing) => {
            return <li>{listing.title}</li>;
          })}
        </ul>
      </div>
      <div id="albumArt">
        <img />
      </div>
    </section>
  );
};

export default Navigation;
