import React, { Component } from 'react'
import './style/app.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import RealAudio from 'container/play/RealAudio'
import Loading from '../loading/Spinner'
import AsyncLoad from 'components/bundle/AsyncLoad'

const SongList = (props) => AsyncLoad(import('container/songList/SongList'), props)
const List = (props) => AsyncLoad(import('container/list/ListContainer'), props)
const Play = (props) => AsyncLoad(import('container/play/Play'), props)

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
