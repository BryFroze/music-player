import { connect } from 'react-redux'
import List from '../components/list/List'
import { getList } from '../reducers/listReducer'

const mapStateToProps = (state) => {
    return {
        list: state.list
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getListData: (key,data) => {
            dispatch(getList(key, data))
        }
    }
}

const ListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(List)

export default ListContainer