import React, { Component } from 'react'
// import PropTypes from 'prop-types'
import PlayControl from './PlayControl'
import RotateImg from './RotateImg'
import Lyric from './Lyric'
import './style/play.css'
import { inject, observer } from 'mobx-react'
import { observable, action } from 'mobx'

@inject('playStatusStore') @observer
class Play extends Component {

    @observable store = {
        showLyric: false,
        id: 0,
        lyrics: {},
        arrayOfTime: []
    }

    // 初始化歌曲数据
    @action
    initMusicData (id) {
        !id && (id = this.props.match.params.id)
        if (this.props.playStatusStore.store.musicId === id) return
        this.store.id = id
        this.props.playStatusStore.initMusicUrl(id) // 获取到歌曲url链接
        this.getMusicLyric(id) // 获取歌词并转换成需要的数据结构
        this.props.playStatusStore.initPlayingSong(id) // 获取歌曲详情数据
    }

    // 获取歌词和解析歌词：把时间和文本存为对象，保存到数组中
    getMusicLyric(id) {
        this.props.playStatusStore.getMusicLyric(id).then(res => {
            res.lrc && this.handleLyric(res.lrc.lyric)
        })
    }

    // 处理歌词
    @action
    handleLyric(lyricStr) {
        let lyricArr = lyricStr.split(/\n/)
        // let arReg = /\[ar:*\]$/i
        // let tiReg = /\[ti:*\]$/i
        let timeReg = /\[\d*:\d*(\.\d*)*\]/g
        let minReg = /\[\d+/
        let secReg = /:\d*(\.\d*)/
        let obj = {}
        let arrayOfTime = []
        
        for (let i = 0; i < lyricArr.length; i++) {
            // let arArr = lyricArr[i].match(arReg)
            // let tiArr = lyricArr[i].match(tiReg)
            let timeArr = lyricArr[i].match(timeReg)
            if (timeArr && timeArr.length) {
                let lyricStr = lyricArr[i].replace(timeArr[0], '')
                if (lyricStr) {
                    for (let j = 0; j < timeArr.length; j++) {
                        let min = timeArr[j].match(minReg)[0].slice(1)
                        let sec = timeArr[j].match(secReg)[0].slice(1)
                        // console.log(timeArr[j], min, sec)
                        let lyricTime = parseInt(min*60000 + sec*1000, 10) + ''
                        obj[lyricTime] = lyricStr
                        arrayOfTime.push(parseInt(lyricTime, 10))
                    }
                }
            }
        }
        arrayOfTime.sort((a, b) => a - b)
        // 处理完的数据赋值
        this.store.lyrics = obj
        this.store.arrayOfTime = arrayOfTime
    }

    // 切换歌词显示
    @action
    switchLyric = () => {
        this.store.showLyric = !this.store.showLyric
    }
    componentDidMount() {
        this.initMusicData()
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.match.params.id !== this.props.match.params.id) {
            let id = nextProps.match.params.id
            this.initMusicData(id)
        }
    }
    render () {
        return (
            <div id="play">
                <header>
                    {this.props.playStatusStore.store.title}
                </header>
                <div
                    className="blur_bac"
                    style={{backgroundImage: `url(${this.props.playStatusStore.store.picUrl})`}}>
                </div>
                {
                    this.store.showLyric ?
                    <Lyric
                        switchLyric={this.switchLyric}
                        lyrics={this.store.lyrics}
                        arrayOfTime={this.store.arrayOfTime}
                        />
                    :                    
                    <RotateImg
                        picUrl={this.props.playStatusStore.store.picUrl}
                        isPlay={this.props.playStatusStore.store.isPlay}
                        switchLyric={this.switchLyric}
                        />
                }
                <PlayControl 
                    mid={this.props.match.params.id} 
                    history={this.props.history}/>
            </div>
        )
    }
}

export default Play