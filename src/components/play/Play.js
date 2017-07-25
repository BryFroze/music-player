import React, { Component } from 'react'
import PlayControl from './PlayControl'
import RotateImg from './RotateImg'
import util from '../../utils/ajax'
import './style/play.css'

class Play extends Component {
    constructor() {
        super()
        this.state = {
            title: '歌曲',
            musicDetail: {},
            picUrl: '',
            musicTime: 0
        }
    }
    componentDidMount() {
        util.post(`/song/detail`, `ids=${this.props.match.params.id}`).then(res => {
            console.log(res)
            this.setState({
                title: res.songs[0].name,
                musicDetail: res.songs[0],
                picUrl: res.songs[0].al.picUrl,
                musicTime: res.songs[0].dt
            })
        })
    }
    render () {
        return (
            <div id="play">
                <header>
                    {this.state.title}
                </header>
                <div
                    className="blur_bac"
                    style={{backgroundImage: `url(${this.state.picUrl})`}}>
                </div>
                <RotateImg picUrl={this.state.picUrl} />
                <PlayControl 
                    mid={this.props.match.params.id} 
                    musicTime={this.state.musicTime} />
            </div>
        )
    }
}

export default Play