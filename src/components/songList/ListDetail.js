import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { observer, inject } from 'mobx-react'
import './style/ListDetail.css'
let Spinner = require('react-spinkit')

@inject('playListStore', 'playingListStore', 'playStatusStore') @observer
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

    // 当列表点击时，更新playingList并跳转到播放页
    toPlay = (id, index) => {
        this.props.playingListStore.updatePlayingList(this.props.playListStore.store.playList.tracks, this.props.listId)
        this.props.playStatusStore.updatePlayNumber(index)
        this.props.history.push(`/play/${id}`)
    }

    componentWillMount() {
        this.props.playListStore.initList(this.props.listId)
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
                    {this.props.playListStore.store.loading && <Spinner name="cube-grid" color="orange" />}
                    {this.props.playListStore.store.playList.tracks && this.props.playListStore.store.playList.tracks.map((item, index) => {
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