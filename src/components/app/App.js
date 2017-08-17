import React, { Component } from 'react'
import './style/app.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// import List from '../list/List'
import SongList from '../../container/SongList'
import List from '../../container/ListContainer'
import Play from '../../container/Play'
import RealAudio from '../../container/RealAudio'
import Loading from './Loading'

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
                     {this.props.isLoading && <Loading />} 
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
