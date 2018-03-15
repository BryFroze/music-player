import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './style/lyric.css'
import { inject, observer } from 'mobx-react';
import { observable, action } from 'mobx';

@inject('audioStore') @observer
class Lyric extends Component {
    static propTypes = {
        switchLyric: PropTypes.func,
        lyrics: PropTypes.object,
        arrayOfTime: PropTypes.object
    }

    @observable store = {
        styleObj: {
            transform: `translateY(0)`
        },
        nowTimeIndex: 0,
        lyricKey: '0',
        nowTime: 0
    }

    // 生成歌词列表
    generateList = () => {
        return this.props.arrayOfTime.map((item, index) => {
            let key = item+''
            return (
                <li key={item} className={index === this.store.nowTimeIndex-1 ? "active": ""}>
                    {this.props.lyrics[key]}
                </li>
            )
        })
    }

    // 绑定audio事件
    bindAudio() {
        this.props.audioStore.store.myAudio.addEventListener('timeupdate', this.timeUpdate)
    }

    // 当播放时间更新时，歌词需要滚动
    timeUpdate = (event) => {
        let nowTime = parseInt(this.props.audioStore.store.myAudio.currentTime*1000, 10)
        this.getNowLyric(nowTime, this.store.nowTimeIndex)
    }

    // 获取当前应该高亮的歌词
    getNowLyric(time, startIndex) {
        let arrayOfTime = this.props.arrayOfTime
        for(let i = startIndex; i < arrayOfTime.length; i++) {
            if (time <= arrayOfTime[0] && this.store.nowTimeIndex !== 0) {
                this.updatePosition(0, arrayOfTime)
                return
            }
            if (time <= arrayOfTime[i]) {
                if (this.store.nowTimeIndex !== i) {
                    this.updatePosition(i, arrayOfTime)
                }
                return
            }
        }
    }

    // 更新歌词的滚动位置
    @action
    updatePosition(i, array) {
        this.store.nowTimeIndex = array[i] + ''
        this.store.nowTimeIndex = i
        this.store.styleObj = {
            transform: `translateY(${-0.8*i}rem)`
        }
    }
    componentWillUnmount() {
        this.props.audioStore.store.myAudio.removeEventListener('timeupdate', this.timeUpdate)
    }
    componentDidMount() {
        this.bindAudio()
    }
    render () {
        return (
            <div className="lyric_container" onClick={this.props.switchLyric}>
                <ul style={this.store.styleObj}>
                    {this.generateList()}
                </ul>
            </div>
        )
    }
}

export default Lyric