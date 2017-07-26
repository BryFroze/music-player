import React, { Component } from 'react'
import './style/realAudio.css'

class RealAudio extends Component {
    constructor() {
        super()
        this.audio = null
    }
    
    componentDidMount() {
        this.props.initAudio(this.audio)
    }
    
    render () {
        return (
            <div className="real_audio">
                <div>
                    <audio
                        src={this.props.musicUrl} 
                        type="audio/mpeg" 
                        autoPlay 
                        id="audio"
                        loop
                        ref={el => this.audio = el}>
                    </audio>
                </div>
            </div>
        )
    }
}

export default RealAudio