import React, { Component } from 'react'
import './style/app.css'
import { BrowserRouter as Router, Route } from 'react-router-dom'

// import List from '../list/List'
import List from '../../container/ListContainer'
import Play from '../../container/Play'
import RealAudio from '../../container/RealAudio'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <Router>
                <div id="app">
                    <RealAudio />
                    <Route exact path="/" component={List} />
                    <Route path="/play/:id" component={Play} />
                </div>
            </Router>
        )
    }
}

export default App