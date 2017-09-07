import { connect } from 'react-redux'
import { ajaxPost } from 'reducers/ajax'
import SingerInfo from 'components/songList/SingerInfo'

const mapDispatchToProps = dispatch => {
    return {
        getData(key, data) {
            return dispatch(ajaxPost(key, data))
        }
    }
}

export default connect(
    null,
    mapDispatchToProps
)(SingerInfo)