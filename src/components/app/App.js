import React, { Component } from 'react'
import './style/app.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import RealAudio from 'components/play/RealAudio'
// import Loading from '../loading/Spinner'
import AsyncLoad from 'components/bundle/AsyncLoad'

const SongList = (props) => AsyncLoad(import('components/songList/SongList'), props)
const List = (props) => AsyncLoad(import('components/list/List'), props)
const Play = (props) => AsyncLoad(import('components/play/Play'), props)

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }

    render() {
        return (
            <Router basename="/react-music">
                <div id="app" className="border">
                     {/* {this.props.isLoading && <Loading />}  */}
                     {/* <Loading loading={this.props.isLoading} /> */}
                    <RealAudio />
                    <Route exact path="/" component={SongList} />
                    <Route exact path="/favor" component={List} />
                    <Route path="/play/:id" component={Play} />
                </div>
            </Router>
        )
    }
}

export default App
