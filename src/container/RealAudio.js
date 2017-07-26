import { connect } from 'react-redux'
import RealAudio from '../components/play/RealAudio'

const mapStateToProps = state => {
    return {
        musicUrl: state.playStatus.musicUrl
    }
}

const mapDispatchToProps = dispatch => {
    return {
        initAudio(audio) {
            dispatch({type: 'SET_AUDIO', audio})
        }
    }
}

const RealAudioContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(RealAudio)

export default RealAudioContainer
