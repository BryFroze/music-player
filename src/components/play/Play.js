import React, { Component } from 'react'
import PropTypes from 'prop-types'
import PlayControl from './PlayControl'
import RotateImg from './RotateImg'
import Lyric from './Lyric'
import './style/play.css'

class Play extends Component {
    static propTypes = {
        playStatus: PropTypes.object,
        playingList: PropTypes.object,
        initPlayNumber: PropTypes.func,
        myAudio: PropTypes.object
    }
    constructor() {
        super()
        this.state = {
            showLyric: false,
            id: 0,
            lyrics: {},
            arrayOfTime: []
        }
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
            res.lrc && this.handleLyric(res.lrc.lyric)
        })
    }
    handleLyric(lyricStr) {
        let lyricArr = lyricStr.split(/\n/)
        let arReg = /\[ar:*\]$/i
        let tiReg = /\[ti:*\]$/i
        let timeReg = /\[\d*:\d*(\.\d*)*\]/g
        let minReg = /\[\d+/
        let secReg = /:\d*(\.\d*)/
        let obj = {}
        let arrayOfTime = []
        
        for (let i = 0; i < lyricArr.length; i++) {
            let arArr = lyricArr[i].match(arReg)
            let tiArr = lyricArr[i].match(tiReg)
            let timeArr = lyricArr[i].match(timeReg)
            if (timeArr) {
                let lyricStr = lyricArr[i].replace(timeArr[0], '')
                // console.log(lyricStr)
                if (lyricStr) {
                    for (let j = 0; j < timeArr.length; j++) {
                        let min = timeArr[j].match(minReg)[0].slice(1)
                        let sec = timeArr[j].match(secReg)[0].slice(1)
                        // console.log(timeArr[j], min, sec)
                        let lyricTime = min*60000 + sec*1000 + ''
                        obj[lyricTime] = lyricStr
                        arrayOfTime.push(parseInt(lyricTime, 10))
                    }
                }
            }
        }
        arrayOfTime.sort((a, b) => a - b)
        this.setState({
            lyrics: obj,
            arrayOfTime: arrayOfTime
        })
    }
    switchLyric = () => {
        this.setState(prevState => ({
            showLyric: !prevState.showLyric
        }))
    }
    componentDidMount() {
        let id = this.props.match.params.id
        this.setState({
            id: id
        })
        this.getMusicDetail(id)
        this.getMusicUrl(id)
        this.getMusicLyric(id)
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id !== this.props.match.params.id) {
            let id = nextProps.match.params.id
            this.getMusicDetail(id)
            this.getMusicUrl(id)
            this.getMusicLyric(id)
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
                {
                    this.state.showLyric ?
                    <Lyric
                        switchLyric={this.switchLyric}
                        lyrics={this.state.lyrics}
                        arrayOfTime={this.state.arrayOfTime}
                        myAudio={this.props.myAudio}
                        />
                    :                    
                    <RotateImg
                        picUrl={this.props.playStatus.picUrl}
                        isPlay={this.props.playStatus.isPlay}
                        switchLyric={this.switchLyric}
                        />
                }
                <PlayControl 
                    mid={this.props.match.params.id} 
                    musicTime={this.props.playStatus.musicTime}
                    myAudio={this.props.myAudio}
                    playlist={this.props.playingList.list}
                    playNumber={this.props.playStatus.playNumber} 
                    updatePlayNumber={this.props.updatePlayNumber}
                    changePlayStatus={this.props.changePlayStatus}
                    history={this.props.history}/>
            </div>
        )
    }
}

export default Play