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
            imgUrl: "",
            title: "",
            creator: {}
        }
    }
    changeTab = (index) => {
        this.setState({
            tab: index
        })
    }
    switchListDetail = (boo, item) => {
        this.setState({
            showDetail: boo
        })
        if (item) {
            this.setState({
                listId: item.id,
                imgUrl: item.coverImgUrl,
                title: item.name,
                creator: item.creator
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
                            title={this.state.title}
                            creator={this.state.creator}
                            switchListDetail={this.switchListDetail}
                            updatePlayingList={this.props.updatePlayingList}
                            updatePlayNumber={this.props.updatePlayNumber} />
                    )
                }
            </div>
        )
    }
}

export default SongList