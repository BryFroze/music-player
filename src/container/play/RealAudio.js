import { connect } from 'react-redux'
import RealAudio from 'components/play/RealAudio'
import { ajaxPost } from 'reducers/ajax'

const mapStateToProps = state => {
    return {
        musicUrl: state.playStatus.musicUrl,
        playStatus: state.playStatus,
        playingList: state.playingList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initAudio(audio) {
            dispatch({type: 'SET_AUDIO', audio})
        },
        getData(key, data) {
            return dispatch(ajaxPost(key, data))
        },
        initMusicUrl(url) {
            dispatch({
                type: 'SET_MUSIC_URL',
                url
            })
        },
        updatePlayNumber(number) {
            dispatch({
                type: 'UPDATE_PLAY_NUMBER',
                number
            })
        },
    }
}

const RealAudioContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(RealAudio)

export default RealAudioContainer
