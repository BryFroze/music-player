import React, { Component } from 'react'
import './style/index.css'
import SongTabHeader from './SongTabHeader'
import MusicListCell from './MusicListCell'
import ListDetail from './ListDetail'
import Tab from '../tab/Tab'
import PropTypes from 'prop-types'

class SongList extends Component {
    static propTypes = {
        songList: PropTypes.object,
        getSongList: PropTypes.func
    }
    constructor() {
        super()
        this.state = {
            tab: 0,
            showDetail: false,
            listId: 0,
            imgUrl: ""
        }
    }
    changeTab = (index) => {
        this.setState({
            tab: index
        })
    }
    switchListDetail = (boo, id, imgUrl) => {
        this.setState({
            showDetail: boo
        })
        if (id && imgUrl) {
            this.setState({
                listId: id,
                imgUrl: imgUrl
            })
        }
    }
    componentDidMount() {
        this.props.getSongList()
    }
    render () {
        return (
            <div className="song_list">
                <SongTabHeader tab={this.state.tab} changeTab={this.changeTab} />
                <div className="list_wrapper">
                    {this.props.songList.listData.map((item, index) => {
                        return (
                            <MusicListCell
                                cellData={item}
                                key={item.id}
                                switchListDetail={this.switchListDetail} />
                        )
                    })}
                </div>
                <Tab match={this.props.match} history={this.props.history} />
                {
                    this.state.showDetail && (
                        <ListDetail
                            listId={this.state.listId}
                            imgUrl={this.state.imgUrl}
                            switchListDetail={this.switchListDetail} />
                    )
                }
            </div>
        )
    }
}

export default SongList