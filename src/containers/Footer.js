import { connect } from "react-redux";
import Footer from "../components/Footer.js";
import state from "../redux/state.js";

const mapStateToProps = (state) => {
    return {
        playlists : state.playlists,
        profile : state.profile,
        currentSong : state.currentSong
    }
}

export default connect (mapStateToProps)(Footer)