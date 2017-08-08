import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PlayControl from './PlayControl'
import RotateImg from './RotateImg'
import './style/play.css'
import storage from '../../utils/storage'

class Play extends Component {
    static propTypes = {
        playStatus: PropTypes.object,
        playlist: PropTypes.array,
        initPlayNumber: PropTypes.func,
        myAudio: PropTypes.object
    }
    // 获取歌曲详情
    getMusicDetail(id) {
        this.props.getData(`/song/detail`, `ids=${id}`).then(res => {
            this.props.initPlayStatus({
                title: res.songs[0].name,
                musicDetail: res.songs[0],
                picUrl: res.songs[0].al.picUrl,
                musicTime: res.songs[0].dt,
                musicId: id
            })
        })
    }
    // 获取音乐的url
    getMusicUrl(id) {
        this.props.getData(`/music/url`, `id=${id}`).then(res => {
            this.props.initMusicUrl(res.data[0].url)
        })
    }
    // TODO: 获取歌词和解析歌词：把时间和文本存为对象，保存到数组中
    getMusicLyric(id) {
        this.props.getData(`/lyric`, `id=${id}`).then(res => {
            // console.log(res)
            let lrcStr = res.lrc.lyric
            let arr = lrcStr.split('\n')

            // console.log(arr)

        })
    }
    // 初始化播放页码
    initPlayNumber() {
        let number = parseInt(storage.read('playNumber'), 10)
        if (number && number !== this.props.playStatus.playNumber) {
            this.props.initPlayNumber(number)
        }
    }
    componentDidMount() {
        this.getMusicDetail(this.props.match.params.id)
        this.getMusicUrl(this.props.match.params.id)
        this.initPlayNumber(this.props.match.params.id)
        // this.getMusicLyric()
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id !== this.props.match.params.id) {
            this.getMusicDetail(nextProps.match.params.id)
            this.getMusicUrl(nextProps.match.params.id)
        }
    }
    render () {
        return (
            <div id="play">
                <header>
                    {this.props.playStatus.title}
                </header>
                <div
                    className="blur_bac"
                    style={{backgroundImage: `url(${this.props.playStatus.picUrl})`}}>
                </div>
                <RotateImg
                    picUrl={this.props.playStatus.picUrl}
                    isPlay={this.props.playStatus.isPlay}
                    />
                <PlayControl 
                    mid={this.props.match.params.id} 
                    musicTime={this.props.playStatus.musicTime}
                    myAudio={this.props.myAudio}
                    playlist={this.props.playlist}
                    playNumber={this.props.playStatus.playNumber} 
                    initPlayNumber={this.props.initPlayNumber}
                    changePlayStatus={this.props.changePlayStatus}
                    history={this.props.history}/>
            </div>
        )
    }
}

export default Play