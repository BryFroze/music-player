import React, { Component } from 'react'
import './style/index.css'
import SongTabHeader from './SongTabHeader'
import ListDetail from './ListDetail'
import SingerList from './SingerList'
import RankList from './RankList'
import Tab from '../tab/Tab'
import PlayList from './PlayList'
import { inject, observer } from 'mobx-react'
import { observable, action } from 'mobx'

@inject('songListStore') @observer
class SongList extends Component {
    @observable store = {
        tab: 0,
        showDetail: false,
        listId: 0,
        imgUrl: "",
        title: "",
        creator: {}
    }

    @action
    changeTab = (index) => {
        this.store.tab = index
    }

    // 切换歌单详细信息
    @action
    switchListDetail = (boo, item) => {
        this.store.showDetail = boo
        if (item) {
            this.store = {
                ...this.store,
                listId: item.id,
                imgUrl: item.coverImgUrl,
                title: item.name,
                creator: item.creator
            }
        }
    }
    componentDidMount() {
        this.props.songListStore.getSongList()
    }
    render () {
        return (
            <div className="song_list">
                <SongTabHeader tab={this.store.tab} changeTab={this.changeTab} />
                {this.store.tab === 0 && <PlayList 
                    songList={this.props.songListStore.store}
                    switchListDetail={this.switchListDetail} />}
                {this.store.tab === 1 && <SingerList />}
                {this.store.tab === 2 && <RankList />}
                <Tab />
                {/* 歌单详细信息的显示 */}
                {
                    this.store.showDetail && (
                        <ListDetail
                            listId={this.store.listId}
                            imgUrl={this.store.imgUrl}
                            title={this.store.title}
                            creator={this.store.creator}
                            switchListDetail={this.switchListDetail}
                            updatePlayNumber={this.props.updatePlayNumber} />
                    )
                }
            </div>
        )
    }
}

export default SongList