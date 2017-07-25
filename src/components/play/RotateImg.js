import React, { Component } from 'react'
import './style/rotateImg.css'

class RotateImg extends Component {
    constructor() {
        super();
        this.state = {
            animationStyle: {
                animationPlayState: 'running'
            }
        }
    }
    switchAnimate = () => {
        this.setState({
            animationStyle: {
                animationPlayState: this.state.animationStyle.animationPlayState === 'running' ? 'paused' : 'running'
            }
        })
    }
    render() {
        return (
            <div
                className="rotate_img"
                style={{...this.state.animationStyle, backgroundImage: `url(${this.props.picUrl})`}}
                onClick={this.switchAnimate}>
            </div>
        )
    }
}

export default RotateImg