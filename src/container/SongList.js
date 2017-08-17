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
        }
    }
}

const SongListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(SongList)

export default SongListContainer