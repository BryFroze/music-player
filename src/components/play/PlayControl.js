import React, { Component } from 'react'
import PropTypes from 'prop-types'
import './style/playControl.css'
import loop from '../../icon/loop.svg'
import prev from '../../icon/prev.svg'
import paused from '../../icon/pause.svg'
import play from '../../icon/play.svg'
import next from '../../icon/next.svg'
import list from '../../icon/list.svg'
import random from '../../icon/random.svg'
import util from '../../utils/ajax'
// import audiosrc from './source/faded.mp3'

class PlayControl extends Component {
    static propTypes = {
        musicTime: PropTypes.number,
        mid: PropTypes.string
    }
    constructor() {
        super()
        this.maxDragEl = null
        this.dragEl = null
        this.state = {
            maxDragDis: 0,
            minDragDis: 0,
            totalWidth: 375,
            playBtn: {
                isPaused: false
            },
            url: '',
            playingTime: 0,
            timer: 0
        }
    }
    // 计算进度条可拖动的最大距离(随屏幕变化)
    calDistance() {
        // FIXME: ref用法变更
        return new Promise((resolve, reject) => {
            let maxWidth = parseInt(getComputedStyle(this.maxDragEl).width, 10);
            let circleWidth = parseInt(getComputedStyle(this.dragEl).width, 10);
            this.setState({
                maxDragDis: maxWidth - circleWidth,
                totalWidth: document.body.clientWidth || document.documentElement.clientWidth
            }, resolve)
        })
    }
    dragDown = async event => {
        event.persist()
        await this.calDistance()
        // console.log(event.touches)
        await (() => {
            const dis = getComputedStyle(this.dragEl);
            const currentX = parseInt(event.touches[0].pageX, 10);
            const currentLeft = parseInt(dis.left, 10);
            const maxMoveDis = parseInt(this.state.maxDragDis, 10);
            // 当前点击的x坐标，进度圆点的left，最大位移距离
            this.dragMove(currentX, currentLeft, maxMoveDis);
        })()
    }
    // 拖动进度条函数，结合上一个dragDown
    dragMove = (currentX, currentLeft, maxMoveDis) => {
        // console.log(currentX, currentLeft, maxMoveDis)
        document.addEventListener('touchmove', event => {
            let moveDis = parseInt(event.touches[0].pageX, 10);
            // 移动距离等于当前的left加上移动距离（当前坐标减去初始点击时的x坐标 = 移动的距离）
            let moveLeft = currentLeft + moveDis - currentX;
            if (moveLeft < 0) {
                moveLeft = 0
            }
            if (moveLeft > maxMoveDis) {
                moveLeft = maxMoveDis
            }
            // console.log('移动中坐标：'+moveDis, '固定左边距:' + currentLeft)
            this.dragEl.style.left = moveLeft + 'px';
        })
        document.addEventListener('touchend', () => {
            this.dragEl.ontouchstart = null;
            document.ontouchend = null;
        })
    }
    // 切换播放和暂停按钮
    switchPlayIcon() {
        return this.state.playBtn.isPaused ? <img onClick={this.switchPlayBtn} src={paused} alt=""/> : <img onClick={this.switchPlayBtn} src={play} alt=""/>
    }
    // 播放按钮点击事件
    switchPlayBtn = () => {
        this.setState({
            playBtn: {
                isPaused: !this.state.playBtn.isPaused
            }
        })
    }
    // 初始化数据
    initData = async () => {
        await this.getMusicData()
        let myAudio = document.getElementById('audio')
        myAudio.onplaying = () => {
            myAudio.play();
        }
    }
    // 获取音乐的url
    getMusicData() {
        new Promise(resolve => {
            util.post(`/music/url`, `id=${this.props.mid}`).then(res => {
                this.setState({
                    url: res.data[0].url
                }, resolve)
            })
        })
    }
    // 转换播放时间(毫秒到分钟)
    tranformTime = (time) => {
        let curTime = Math.floor(time/1000)
        let minute = parseInt(curTime/60)
        let second = curTime%60
        if (minute < 10) minute = '0' + minute
        if (second < 10) second = '0' + second
        return minute + ':' + second
    }
    // 播放时间定时器
    playInterval() {
        if (parseInt(this.state.playingTime/1000) <= parseInt(this.props.musicTime/1000)) {
            this.state.timer = setTimeout(() => {
                this.setState((prevState) => {
                    return {
                        playingTime: prevState.playingTime + 1000
                    }
                })
                this.circleLoop()
                this.playInterval()
            }, 1000)
        }
    }
    // 随时间走动的圆点
    circleLoop() {
        let progress = parseFloat(this.state.playingTime/this.props.musicTime).toFixed(3)
        // console.log(progress)
        let left = this.state.maxDragDis*progress
        this.dragEl.style.left = left + 'px'
    }
    componentDidMount() {
        setTimeout(() => {
            this.calDistance()
        }, 0)
        this.initData()
    }
    componentWillReceiveProps(nextProps) {
        if (nextProps.musicTime !== 0) {
            this.playInterval()
        }
    }
    render() {
        return (
            <div className="control_container">
                <div className="time_progress">
                    <span>{this.tranformTime(this.state.playingTime)}</span>
                    <span ref={el => this.maxDragEl = el}>
                        <i ref={el => this.dragEl = el} id="drag" onTouchStart={this.dragDown}>
                            <b></b>
                        </i>
                    </span>
                    <span>{this.tranformTime(this.props.musicTime)}</span>
                </div>
                <div className="control_button">
                    <div className="play_order">
                         <img src={loop} alt=""/>
                        {/* {loop} */}
                    </div>
                    <div>
                        <img src={prev} alt=""/>
                        {this.switchPlayIcon()}
                        <img src={next} alt=""/>
                    </div>
                    <div className="list">
                        <img src={list} alt=""/>
                    </div>
                </div>
                <div className="real_audio">
                    <audio src={this.state.url} type="audio/mpeg" autoPlay id="audio" loop></audio>
                </div>
            </div>
        )
    }
}

export default PlayControl