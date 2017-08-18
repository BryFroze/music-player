import { connect } from 'react-redux'
import List from '../components/list/List'
import { getList } from '../reducers/listReducer'

const mapStateToProps = (state) => {
    return {
        list: state.list,
        scrollDis: state.list.scrollDis
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        getListData: (key,data) => {
            dispatch(getList(key, data))
        },
        saveScrollDis(dis) {
            dispatch({
                type: 'SAVE_SCROLL_DIS',
                dis
            })
        },
        updatePlayNumber(number) {
            dispatch({
                type: 'UPDATE_PLAY_NUMBER',
                number
            })
        },
        updatePlayingList(list, listId) {
            dispatch({
                type: 'SET_PLAYING_LIST',
                data: {
                    list,
                    listId
                }
            })
        }
    }
}

const ListContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(List)

export default ListContainer
