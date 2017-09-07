import { connect } from 'react-redux'
import App from 'components/app/App'
import { getList } from 'reducers/list'

const mapStateToProps = state => {
    return {
        isLoading: state.ajaxStatus.isLoading
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getCacheList() {
            dispatch(getList())
        }
    }
}

const AppContainer = connect(
    mapStateToProps,
    mapDispatchToProps
)(App)

export default AppContainer