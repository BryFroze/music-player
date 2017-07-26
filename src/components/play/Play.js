import React, { Component } from 'react'
import PlayControl from './PlayControl'
import RotateImg from './RotateImg'
import util from '../../utils/ajax'
import './style/play.css'

class Play extends Component {
    // 获取歌曲详情
    getMusicDetail() {
        util.post(`/song/detail`, `ids=${this.props.match.params.id}`).then(res => {
            this.props.initPlayStatus({
                title: res.songs[0].name,
                musicDetail: res.songs[0],
                picUrl: res.songs[0].al.picUrl,
                musicTime: res.songs[0].dt,
                musicId: this.props.match.params.id
            })
        })
    }
    // 获取音乐的url
    getMusicUrl() {
        new Promise(resolve => {
            util.post(`/music/url`, `id=${this.props.match.params.id}`).then(res => {
                this.props.initMusicUrl(res.data[0].url)
            })
        })
    }
    // TODO: 获取歌词和解析歌词：把时间和文本存为对象，保存到数组中
    getMusicLyric() {
        util.post(`/lyric`, `id=${this.props.match.params.id}`).then(res => {
            // console.log(res)
            let lrcStr = res.lrc.lyric
            let arr = lrcStr.split('\n')

            // console.log(arr)

        })
    }
    componentDidMount() {
        this.getMusicDetail()
        this.getMusicUrl()
        this.getMusicLyric()
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
                <RotateImg picUrl={this.props.playStatus.picUrl} />
                <PlayControl 
                    mid={this.props.match.params.id} 
                    musicTime={this.props.playStatus.musicTime}
                    myAudio={this.props.myAudio}/>
            </div>
        )
    }
}

export default Play