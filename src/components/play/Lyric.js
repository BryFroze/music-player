import React, { Component } from 'react'
import PropTypes from 'prop-types'

import './style/lyric.css'

class Lyric extends Component {
    static propTypes = {
        switchLyric: PropTypes.func,
        lyrics: PropTypes.object,
        arrayOfTime: PropTypes.array,
        myAudio: PropTypes.object
    }
    constructor() {
        super()
        this.state = {
            styleObj: {
                transform: `translateY(0)`
            },
            nowTimeIndex: 0,
            lyricKey: '0',
            nowTime: 0
        }
    }
    generateList = () => {
        return this.props.arrayOfTime.map((item, index) => {
            let key = item+''
            return (
                <li key={item} className={index == this.state.nowTimeIndex-1 ? "active": ""}>
                    {this.props.lyrics[key]}
                </li>
            )
        })
    }
    bindAudio() {
        this.props.myAudio.addEventListener('timeupdate', this.timeUpdate)
    }
    timeUpdate = (event) => {
        let nowTime = parseInt(this.props.myAudio.currentTime*1000, 10)
        this.getNowLyric(nowTime, this.state.nowTimeIndex)
    }
    getNowLyric(time, startIndex) {
        let arrayOfTime = this.props.arrayOfTime
        for(let i = startIndex; i < arrayOfTime.length; i++) {
            if (time <= arrayOfTime[0] && this.state.nowTimeIndex !== 0) {
                this.updatePosition(0, arrayOfTime)
                return
            }
            if (time <= arrayOfTime[i]) {
                if (this.state.nowTimeIndex !== i) {
                    this.updatePosition(i, arrayOfTime)
                }
                return
            }
        }
    }
    updatePosition(i, array) {
        this.setState({
            nowTimeIndex: i,
            lyricKey: array[i]+''
        }, () => {
            this.setState({
                styleObj: {
                    transform: `translateY(${-0.8*i}rem)`
                }
            })
        })
    }
    componentWillUnmount() {
        this.props.myAudio.removeEventListener('timeupdate', this.timeUpdate)
    }
    componentDidMount() {
        this.bindAudio()
    }
    render () {
        return (
            <div className="lyric_container" onClick={this.props.switchLyric}>
                <ul style={this.state.styleObj}>
                    {this.generateList()}
                </ul>
            </div>
        )
    }
}

export default Lyric