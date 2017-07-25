import React, { Component } from 'react'
import axios from 'axios'
import qs from 'qs'
import './style/playControl.css'
import loop from '../../icon/loop.svg'
import prev from '../../icon/prev.svg'
import paused from '../../icon/pause.svg'
import play from '../../icon/play.svg'
import next from '../../icon/next.svg'
import list from '../../icon/list.svg'
// import audiosrc from './source/faded.mp3'

class PlayControl extends Component {
    constructor() {
        super()
        this.state = {
            maxDragDis: 0,
            minDragDis: 0,
            totalWidth: 375,
            playBtn: {
                isPaused: false
            }
        }
    }
    calDistance() {
        return new Promise((resolve, reject) => {
            let maxWidth = parseInt(getComputedStyle(this.refs.maxDragEl).width, 10);
            let circleWidth = parseInt(getComputedStyle(this.refs.dragEl).width, 10);
            this.setState({
                maxDragDis: maxWidth - circleWidth,
                totalWidth: document.body.clientWidth || document.documentElement.clientWidth
            }, () => {
                resolve()
            })
        })
    }
    dragDown = async event => {
        event.persist()
        await this.calDistance()
        // console.log(event.touches)
        await (() => {
            const dis = getComputedStyle(this.refs.dragEl);
            const currentX = parseInt(event.touches[0].pageX, 10);
            const currentLeft = parseInt(dis.left, 10);
            const maxMoveDis = parseInt(this.state.maxDragDis, 10);
            this.dragMove(currentX, currentLeft, maxMoveDis);
        })()
    }
    dragMove = (currentX, currentLeft, maxMoveDis) => {
        console.log(currentX, currentLeft, maxMoveDis)
        let dragObj = document.getElementById('drag');
        document.addEventListener('touchmove', event => {
            let moveDis = parseInt(event.touches[0].pageX, 10);
            let moveLeft = currentLeft + moveDis - currentX;
            if (moveLeft < 0) {
                moveLeft = 0
            }
            if (moveLeft > maxMoveDis) {
                moveLeft = maxMoveDis
            }
            // console.log('移动中坐标：'+moveDis, '固定左边距:' + currentLeft)
            dragObj.style.left = moveLeft + 'px';
        })
        document.addEventListener('touchend', () => {
            dragObj.onmousedown = null;
            document.onmousemove = null;
        })
    }
    switchPlayIcon() {
        return this.state.playBtn.isPaused ? <img onClick={this.switchPlayBtn} src={paused} alt=""/> : <img onClick={this.switchPlayBtn} src={play} alt=""/>
    }
    switchPlayBtn = () => {
        this.setState({
            playBtn: {
                isPaused: !this.state.playBtn.isPaused
            }
        })
    }
    getMusicData() {
        axios.post("/api/search/pc", qs.stringify({
            s: 'faded',
            offset: 0,
            limit: 10,
            type: 1
        })).then(res => {
            console.log(res.data.result.songs)
            axios.post(`/api/song/detail/`, qs.stringify({
                id: '3406843',
                ids: [],
                Referer: 'http://music.163.com/'
            })).then(res => {
                console.log(res.data)
            })
        })
    }
    componentDidMount() {
        this.calDistance()
        this.getMusicData();
        let myAudio = document.getElementById('audio')
        myAudio.onplaying = () => {
            console.log('jia')
            myAudio.play();
        }

    }
    render() {
        return (
            <div className="control_container">
                <div className="time_progress">
                    <span>00:00</span>
                    <span ref="maxDragEl">
                        <i ref="dragEl" id="drag" onTouchStart={this.dragDown}>
                            <b></b>
                        </i>
                    </span>
                    <span>08:00</span>
                </div>
                <div className="control_button">
                    <div className="play_order">
                        <img src={loop} alt=""/>
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
                    <audio src="http://m2.music.126.net/OjgrxW7zsP6QzPE9baQULA==/1415071473003094.mp3" type="audio/mpeg" autoPlay id="audio" loop></audio>
                </div>
            </div>
        )
    }
}

export default PlayControl