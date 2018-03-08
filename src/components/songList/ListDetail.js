import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import './style/ListDetail.css'
import ajax from '../../utils/ajax'
import storage from '../../utils/storage'
let Spinner = require('react-spinkit')

class ListDetail extends Component {
    static PropTypes = {
        switchListDetail: PropTypes.func,
        imgUrl: PropTypes.string,
        title: PropTypes.string,
        listId: PropTypes.number,
        creator: PropTypes.object,
        match: PropTypes.object.isRequired,
        location: PropTypes.object.isRequired,
        history: PropTypes.object.isRequired
    }
    constructor() {
        super()
        this.state = {
            playList: {},
            loading: false
        }
    }
    getSongListDetail() {
        let listId = storage.read('listId')
        let playlist = storage.read('playlist')
        if (!listId || listId != this.props.listId) {
            this.setState(() => {
                return {
                    loading: true
                }
            }, () => {
                storage.save({
                    name: 'listId',
                    data: this.props.listId
                })
                ajax.post(`/playlist/detail`, `id=${this.props.listId}`).then(res => {
                    this.setState({
                        playList: res.result
                    })
                    storage.save({
                        name: 'playlist',
                        data: JSON.stringify(res.result)
                    })
                    this.setState({
                        loading: false
                    })
                })
            })
        } else {
            this.setState({
                playList: JSON.parse(playlist)
            })
        }
    }
    // 当列表点击时，更新redux的playingList并跳转到播放页
    toPlay = (id, index) => {
        this.props.updatePlayingList(this.state.playList.tracks, this.props.listId)
        this.props.updatePlayNumber(index)
        this.props.history.push(`/play/${id}`)
    }
    componentWillMount() {
        this.getSongListDetail()
    }
    render () {
        return (
            <div className="list_detail">
                <div className="list_creator">
                    <div className="detail_header">
                        <p onClick={this.props.switchListDetail.bind(null, false)}> {"<"} </p>
                        <p>歌单</p>
                    </div>
                    <div className="list_creator_info">
                        <p>
                            <img src={this.props.imgUrl} alt="" />
                        </p>
                        <p>
                            <span>
                                {this.props.title}
                            </span>
                            <span>
                                <img src={this.props.creator.avatarUrl} alt="" />
                                <b>{this.props.creator.nickname}</b>
                            </span>
                        </p>
                    </div>
                    <div className="list_blur_bac" style={{backgroundImage: `url(${this.props.imgUrl}`}}></div>
                </div>
                <div className="detail_content">
                    {this.state.loading && <Spinner name="cube-grid" color="orange" />}
                    {this.state.playList.tracks && this.state.playList.tracks.map((item, index) => {
                        return (
                            <div
                                className="content_song_list border"
                                key={item.id}
                                onClick={() => this.toPlay(item.id, index)}>
                                <p>
                                    {index+1}
                                </p>
                                <p>
                                    <span>{item.name}</span>
                                    <span>
                                        {item.artists[0].name} - {item.album.name}
                                    </span>
                                </p>
                            </div>
                        )
                    })}
                </div>
            </div>
        )
    }
}

export default withRouter(ListDetail)