import React, { Component } from 'react'
import './style/app.css'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import List from '../list/List'
import Play from '../Play/Play'

class App extends Component {
    constructor(props) {
        super(props)
        this.state = {}
    }
    render() {
        return (
            <Router>
                <div id="app">
                    <Route exact path="/" component={List} />
                    <Route path="/play" component={Play} />
                </div>
            </Router>
        )
    }
}

export default App