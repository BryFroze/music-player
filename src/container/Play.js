import { connect } from 'react-redux'
import Play from '../components/play/Play'
import { ajaxPost } from '../reducers/ajax'

/*
    播放页需要的状态：
        1. 播放歌曲的状态(标题，图片，url，播放时间等)
        2. 当前播放歌曲的序号，播放列表
*/
const mapStateToProps = (state) => {
    return {
        playStatus: state.playStatus,
        myAudio: state.audio.myAudio,
        playlist: state.list.playlist
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
        },
        initPlayNumber(number) {
            dispatch({
                type: 'UPDATE_PLAY_NUMBER',
                number
            })
        },
        getData(key, data) {
            return dispatch(ajaxPost(key, data))
        },
        changePlayStatus() {
            dispatch({
                type: 'CHANGE_PLAY_STATUS'
            })
        }
    }
}

const PlayContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(Play)

export default PlayContainer
