import { connect } from 'react-redux'
import Play from '../components/play/Play'

const mapStateToProps = (state) => {
    return {
        playStatus: state.playStatus,
        myAudio: state.audio.myAudio
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        initPlayStatus(data) {
            dispatch({
                type: 'INIT_PLAYING_STATE',
                data
            })
        },
        initMusicUrl(url) {
            dispatch({
                type: 'SET_MUSIC_URL',
                url
            })
        }
    }
}

const PlayContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Play)

export default PlayContainer