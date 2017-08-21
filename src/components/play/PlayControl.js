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
// import util from '../../utils/ajax'
// import audiosrc from './source/faded.mp3'

class PlayControl extends Component {
    static propTypes = {
        musicTime: PropTypes.number,
        mid: PropTypes.string,
        playlist: PropTypes.array,
        playNumber: PropTypes.number,
        initPlayNumber: PropTypes.func
    }
    constructor() {
        super()
        this.maxDragEl = null
        this.dragEl = null
        this.progressLine = null
        this.playType = 0
        this.state = {
            maxDragDis: 0,
            minDragDis: 0,
            totalWidth: 375,
            circleWidth: 0,
            playBtn: {
                isPaused: false
            },
            url: '',
            playingTime: 0,
            timer: 0,
            musicTime: 0,
            caching: true,
            onThisCom: true
        }
    }
    // 计算进度条可拖动的最大距离(随屏幕变化)
    calDistance() {
        return new Promise((resolve, reject) => {
            let maxWidth = parseInt(getComputedStyle(this.maxDragEl).width, 10);
            let circleWidth = parseInt(getComputedStyle(this.dragEl).width, 10);
            this.setState({
                maxDragDis: maxWidth - circleWidth,
                totalWidth: document.body.clientWidth || document.documentElement.clientWidth,
                circleWidth: circleWidth
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
        return this.state.playBtn.isPaused ? 
        <img onClick={this.switchPlayBtn} src={play} alt=""/> : 
        <img onClick={this.switchPlayBtn} src={paused} alt=""/>
    }
    // 切换播放模式
    switchPlayTypeIcon = () => {
        return this.playType === 0 ?
            <img src={loop} alt="" onClick={this.switchPlayType}/> : 
            <img src={random} alt="" onClick={this.switchPlayType}/>
    }
    switchPlayType = () => {
        this.playType === 0 ?
        this.playType = 1 :
        this.playType = 0
    }
    // 播放按钮点击事件
    switchPlayBtn = () => {
        if (this.state.playBtn.isPaused) {
            this.props.myAudio.play()
        } else {
            this.props.myAudio.pause()
        }
        this.props.changePlayStatus()
        this.setState({
            playBtn: {
                isPaused: !this.state.playBtn.isPaused
            }
        })
    }
    // 初始化数据
    initData = () => {
        // await this.getMusicData()
        this.props.myAudio.addEventListener('canplay', () => {
            if (this.state.caching) {
                this.setState({
                    caching: false
                })
            }
            this.props.myAudio.play()
        })
    }
    // 转换播放时间(毫秒到分钟)
    tranformTime = (time) => {
        let curTime = Math.floor(time/1000)
        let minute = parseInt(curTime/60, 10)
        let second = curTime%60
        if (minute < 10) minute = '0' + minute
        if (second < 10) second = '0' + second
        return minute + ':' + second
    }
    // 播放时间定时器
    playInterval() {
        this.props.myAudio.addEventListener('timeupdate', this.handler)
    }
    handler = () => {
        this.setState((prevState) => {
            return {
                playingTime: parseInt(this.props.myAudio.currentTime, 10)*1000
            }
        })
        this.circleLoop()
    }
    // 随时间走动的圆点
    circleLoop() {
        let progress = parseFloat(this.state.playingTime/this.props.musicTime).toFixed(3)
        // console.log(progress)
        let left = this.state.maxDragDis*progress
        this.dragEl.style.left = left + 'px'
        this.progressLine.style.width = left + this.state.circleWidth/2 + 'px'
    }
    // 上一曲和下一曲
    playNext = () => {
        this.playChange(1)
        this.resetPlayStatus()
    }
    playPrev = () => {
        this.playChange(0)
        this.resetPlayStatus()
    }
    resetPlayStatus() {
        this.setState({
            caching: true,
            playingTime: 0
        })
    }
    playChange(type) {
        this.props.myAudio.pause()
        let number = this.props.playNumber
        let length = this.props.playlist.length-1
        let id;
        if (type === 1) {
            number++
            if (number > length) number = 0
            id = this.props.playlist[number].id
        } else {
            number--
            if (number < 0) number = length
            id = this.props.playlist[number].id
        }
        this.props.history.replace({
            pathname: `/play/${id}`
        })
        this.props.updatePlayNumber(number)
    }
    componentDidMount() {
        setTimeout(() => {
            this.calDistance()
        }, 0)
    }
    componentWillReceiveProps(nextProps) {
        // 只有当myAudio元素正确获取时才能执行相关api操作
        if (nextProps.musicTime !== 0 && nextProps.myAudio) {
            this.playInterval()
            this.initData()
        }
    }
    componentWillUnmount() {
        this.props.myAudio.removeEventListener('timeupdate', this.handler)
    }
    render() {
        return (
            <div className="control_container">
                <div className="time_progress">
                    <span>{this.tranformTime(this.state.playingTime)}</span>
                    <span ref={el => this.maxDragEl = el}>
                        <i ref={el => this.dragEl = el} id="drag" onTouchStart={this.dragDown}>
                            <b className="red_bullet"></b>
                            {
                                this.state.caching && (
                                <b className="cache_loading">
                                    <b></b>
                                    <b></b>
                                    <b></b>
                                    <b></b>
                                </b>
                                )
                            }
                        </i>
                        <i ref={el => this.progressLine = el}></i>
                    </span>
                    <span>{this.tranformTime(this.props.musicTime)}</span>
                </div>
                <div className="control_button">
                    <div className="play_order">
                        {this.switchPlayTypeIcon()}
                         {/* <img src={loop} alt=""/> */}
                        {/* {loop} */}
                    </div>
                    <div>
                        <img src={prev} alt="" onClick={this.playPrev}/>
                        {this.switchPlayIcon()}
                        <img src={next} alt="" onClick={this.playNext}/>
                    </div>
                    <div className="list">
                        <img src={list} alt=""/>
                    </div>
                </div>
            </div>
        )
    }
}

export default PlayControl