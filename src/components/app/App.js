import React, { Component } from 'react'
import './style/app.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// import List from '../list/List'
import SongList from 'container/songList/SongList'
import List from 'container/list/ListContainer'
import Play from 'container/play/Play'
import RealAudio from 'container/play/RealAudio'
import Loading from '../loading/Spinner'
class App extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    componentDidMount() {
        this.props.getCacheList()
        // console.log(this.props)
    }
    render() {
        return (
            <Router basename="/react-music">
                <div id="app" className="border">
                     {/* {this.props.isLoading && <Loading />}  */}
                     <Loading loading={this.props.isLoading} />
                    <RealAudio />
                    <Route exact path="/" component={SongList} />
                    <Route exact path="/list" component={List} />
                    <Route path="/play/:id" component={Play} />
                </div>
            </Router>
        )
    }
}

export default App
