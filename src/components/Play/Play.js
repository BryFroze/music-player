import React, { Component } from 'react'
import PlayControl from './PlayControl'
import RotateImg from './RotateImg'

class Play extends Component {
    constructor () {
        super()
    }

    render () {
        return (
            <div id="play">
                <div className="blur_bac">
                </div>
                <RotateImg />
                <PlayControl />
            </div>
        )
    }
}

export default Play