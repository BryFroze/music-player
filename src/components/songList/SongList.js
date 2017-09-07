import React, { Component } from 'react'
import './style/index.css'
import SongTabHeader from './SongTabHeader'
import ListDetail from './ListDetail'
import SingerList from 'container/songList/SingerList'
import Tab from '../tab/Tab'
import PlayList from './PlayList'
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
                {this.state.tab === 0 && <PlayList
                    switchListDetail={this.switchListDetail}
                    songList={this.props.songList} />}
                {this.state.tab === 1 && <SingerList />}
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