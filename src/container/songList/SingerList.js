import { connect } from 'react-redux'
import { ajaxPost } from 'reducers/ajax'
import { UPDATE_SINGER_LIST } from 'reducers/actionType'
import SingerList from 'components/songList/SingerList'

const mapStateToProps = state => {
    return {
        singerList: state.songList.singerList
    }
}

const mapDispatchToProps = dispatch => {
    return {
        updateSingerList(list) {
            dispatch({
                type: UPDATE_SINGER_LIST,
                list
            })
        },
        getData(key, data) {
            return dispatch(ajaxPost(key, data))
        }
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(SingerList)