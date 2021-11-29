import {useState, useEffect} from 'react';

const DeletePlaylist = (props) => {

    const [serverResponse, setServerResponse] = useState('');
    
    const style = () => {
        return {
            display: props.deletePlaylistState.show ? "flex" : "none",
        }
    }

    const handleDeletePlaylist = async () => {

        let payload = {
            userID : props.profile.userID
        }

        const requestOptions = {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Accept: "*/*",
              authorization : `Bearer ${props.profile.accessToken}`
            },
            body: JSON.stringify(payload),
          };
      
           await fetch(`https://reach-server.vercel.app/playlists/deletePlaylist/${props.deletePlaylistState.id}`, requestOptions)
            .then((response) => response.json())
            .then((data) => {if (data.success === "playlist-deleted") {
                props.deletePlaylist(props.deletePlaylistState.id)
                props.resetDeleteMenu();
                console.log(data)
            } props.setServerResponse(data.success)
        })
        
        
    }

    return (
        <div id="deleteMenuCont" style={style()}>
            <div id="greyLayer" style={style()}></div>
            <div id="deleteMenu" style={style()} onClick={()=>props.resetDeleteMenu()}>
                <h1>Delete {props.deletePlaylistState.title}</h1>
                <p>This action cannot be undone.</p>
                <div id="deletePlaylistButtonRow">
                    <button onClick={()=>props.resetDeleteMenu()}>Cancel</button>
                    <button onClick={()=>handleDeletePlaylist()}>Delete</button>
                </div>
            </div>
        </div>
        
    )
}

export default DeletePlaylist