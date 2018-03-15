import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import './style/realAudio.css'
import { withRouter } from 'react-router-dom'
import { inject, observer } from 'mobx-react'

@inject('audioStore', 'playStatusStore', 'playingListStore') @observer
class RealAudio extends Component {
    constructor() {
        super()
        this.audio = null
    }
    
    // 循环下一曲
    playNext() {
        let number = this.props.playStatusStore.store.playNumber
        let list = this.props.playingListStore.store.list
        let length = list.length - 1
        let id = 0
        if (number++ > length) {
            number = 0
        }
        id = list[number].id
        let location = this.props.location
        if ('/play/'.indexOf(location.pathname) !== -1) {
            this.props.history.replace({
                pathname: `/play/${id}`
            })
        } else {
            // 如果是其它页面，audio是后台播放，就发送请求去获取数据
            this.props.playStatusStore.initMusicUrl(id)
        }
    }

    // 歌曲播放结束时，下一曲
    ended = () => {
        this.playNext()
    }

    componentDidMount() {
        this.props.audioStore.initAudio(this.audio)
        this.audio.addEventListener('canplay', () => {
            this.audio.play()
        })
        this.audio.addEventListener('ended', this.ended)
    }
    
    render () {
        return (
            <div className="real_audio">
                <div>
                    <audio
                        src={this.props.playStatusStore.store.musicUrl} 
                        type="audio/mpeg" 
                        autoPlay 
                        id="audio"
                        ref={el => this.audio = el}>
                    </audio>
                </div>
            </div>
        )
    }
}

export default withRouter(RealAudio)