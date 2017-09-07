import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style/realAudio.css'
import { withRouter } from 'react-router-dom'

class RealAudio extends Component {
    static propTypes = {
        musicUrl: PropTypes.string,
        playStatus: PropTypes.object,
        playingList: PropTypes.object,
        initAudio: PropTypes.func,
        getData: PropTypes.func,
        initPlayStatus: PropTypes.func,
        initMusicUrl: PropTypes.func,
        updatePlayNumber: PropTypes.func
    }
    constructor() {
        super()
        this.audio = null
    }
    // 循环下一曲
    playNext() {
        let number = this.props.playStatus.playNumber
        let list = this.props.playingList.list
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
            this.getMusicUrl(id)
        }
    }
    // 获取音乐url
    getMusicUrl(id) {
        this.props.getData(`/music/url`, `id=${id}`).then(res => {
            this.props.initMusicUrl(res.data[0].url)
        })
    }
    ended = () => {
        this.playNext()
    }
    componentDidMount() {
        this.props.initAudio(this.audio)
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
                        src={this.props.musicUrl} 
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