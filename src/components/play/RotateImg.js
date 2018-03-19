import React, { Component } from 'react'
import './style/rotateImg.css'
import { observer, inject } from 'mobx-react'
import { observable, action, autorun } from 'mobx'

@inject('playStatusStore') @observer
class RotateImg extends Component {
    @observable store = {
        animationStyle: {
            animationPlayState: 'running'
        }
    }

    @action
    switchAnimate = () => {
        autorun(() => {
            this.store.animationStyle = {
                animationPlayState: !this.props.playStatusStore.store.isPlay ? 'paused' : 'running'
            }
        })
    }

    componentDidMount() {
        this.switchAnimate()
    }
    render() {
        return (
            <div
                className="rotate_img"
                style={{...this.store.animationStyle, backgroundImage: `url(${this.props.playStatusStore.store.picUrl})`}}
                onClick={this.props.switchLyric}>
            </div>
        )
    }
}

export default RotateImg