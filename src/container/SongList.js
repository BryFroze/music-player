import { connect } from 'react-redux'
import SongList from '../components/songList/SongList'
import { getSongList } from '../reducers/songList'

const mapStateToProps = (state) => {
    return {
        songList: state.songList
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getSongList() {
            dispatch(getSongList())
        },
        updatePlayingList(list, listId) {
            dispatch({
                type: 'SET_PLAYING_LIST',
                data: {
                    list,
                    listId
                }
            })
        },
        updatePlayNumber(number) {
            dispatch({
                type: 'UPDATE_PLAY_NUMBER',
                number
            })
        }
    }
}

const SongListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SongList)

export default SongListContainer