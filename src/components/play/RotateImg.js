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
                animationPlayState: this.props.isPlay ? 'paused' : 'running'
            }
        })
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.isPlay !== this.props.isPlay) {
            this.switchAnimate()
        }
    }
    render() {
        return (
            <div
                className="rotate_img"
                style={{...this.state.animationStyle, backgroundImage: `url(${this.props.picUrl})`}}
                onClick={this.props.switchLyric}>
            </div>
        )
    }
}

export default RotateImg