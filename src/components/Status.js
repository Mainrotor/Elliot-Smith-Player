import { useHistory } from "react-router";

const Status = (props) => {
  let history = useHistory();
  const generateStatus = () => {
    switch (props.serverResponse.success) {
      case "added-queue":
        setTimeout(() => {
          props.setServerResponse({});
        }, 3000);
        return (
          <div className="statusContainer">
            <div id="addedQueuePopup">
              <p>Added to queue</p>
            </div>
          </div>
        );
        break;
      case "success":
        console.log("song added");
        setTimeout(() => {
          props.setServerResponse({});
        }, 3000);
        return (
          <div className="statusContainer">
            <div id="songAddedPopup">
              <p>Song Added</p>
            </div>
          </div>
        );
        break;
      case "fail":
        console.log("song failed");
        setTimeout(() => {
          props.setServerResponse({});
        }, 3000);
        return (
          <div className="statusContainer">
            <div id="songFailedPopup">
              <p>Error Occured</p>
            </div>
          </div>
        );
        break;
      case "account-created":
        history.push("/login");
        setTimeout(() => {
          props.setServerResponse({});
        }, 3000);
        return (
          <div className="statusContainerHigh">
            <div id="accountCreatedPopup">
              <p>Account Created</p>
            </div>
          </div>
        );
        break;
      case "email-in-use":
        setTimeout(() => {
          props.setServerResponse({});
        }, 3000);
        return (
          <div className="statusContainerHigh">
            <div id="emailInUsePopup">
              <p>This email is already in use</p>
            </div>
          </div>
        );
        break;
      case "email-not-found":
        setTimeout(() => {
          props.setServerResponse({});
        }, 3000);
        return (
          <div className="statusContainerHigh">
            <div id="emailNotFoundPopup">
              <p>Account not found</p>
            </div>
          </div>
        );
        break;
      case "login-success":
        console.log("login succeeded");
        history.push("/home");
        setTimeout(() => {
          props.setServerResponse({});
        }, 3000);
        return (
          <div className="statusContainer">
            <div id="loginSuccessPopup">
              <p>Logging you in...</p>
            </div>
          </div>
        );
        break;
      case "login-failed":
        console.log("login failed");
        setTimeout(() => {
          props.setServerResponse({});
        }, 3000);
        return (
          <div className="statusContainer">
            <div id="loginFailedPopup">
              <p>Your username or password was incorrect</p>
            </div>
          </div>
        );
        break;
      case "playlist-created":
        console.log("playlist created");
        setTimeout(() => {
          props.setServerResponse({});
        }, 3000);
        return (
          <div className="statusContainer">
            <div id="playlistCreatedPopup">
              <p>Playlist Created</p>
            </div>
          </div>
        );
        break;
      case "playlist-deleted":
        setTimeout(() => {
          props.setServerResponse({});
        }, 3000);
        return (
          <div className="statusContainer">
            <div id="playlistDeletedPopup">
              <p>Playlist Deleted</p>
            </div>
          </div>
        );
        break;
      case "song-deleted":
        setTimeout(() => {
          props.setServerResponse({});
        }, 3000);
        return (
          <div className="statusContainer">
            <div id="songDeletedPopup">
              <p>Song Deleted</p>
            </div>
          </div>
        );
        break;
      case "invalid-auth":
        setTimeout(() => {
          props.setServerResponse({});
        }, 3000);
        return (
          <div className="statusContainer">
            <div id="invalidAuthPopup">
              <p>You're not authorized to do that</p>
            </div>
          </div>
        );
        break;
      default:
        console.log(props.serverResponse.success);
        return <div></div>;
        break;
    }
  };

  return generateStatus();
};

export default Status;
