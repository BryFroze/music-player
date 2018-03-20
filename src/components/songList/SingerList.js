import React, { Component } from 'react'
import './style/singerList.css'
import SingerInfo from './SingerInfo'
import { inject, observer } from 'mobx-react'

@inject('songListStore') @observer
class SingerList extends Component {
    constructor() {
        super()
        this.state = {
            isShowSinger: false,
            singerId: 0
        }
    }
    getSingerList() {
        this.props.songListStore.getSingerList()
    }
    showSingerInfo(id) {
        this.switchInfo()
        if (id) {
            this.setState({
                singerId: id
            })
        }
    }
    switchInfo = () => {
        this.setState({
            isShowSinger: !this.state.isShowSinger
        })
    }
    componentDidMount() {
        this.getSingerList()
    }
    render () {
        return (
            <div className="singer_container">
                <ul>
                    {
                        this.props.songListStore.store.singerList.map((item, index) => {
                            return (
                                <li
                                    key={item.id}
                                    className="border"
                                    onClick={() => this.showSingerInfo(item.id)}>
                                    <span className="singer_pic">
                                        <img src={item.img1v1Url} alt="" />
                                    </span>
                                    <span className="singer_name">
                                        {item.name}
                                    </span>
                                </li>
                            )
                        })
                    }
                </ul>
                {
                    this.state.isShowSinger && <SingerInfo switchInfo={this.switchInfo} id={this.state.singerId}/>
                }
            </div>
        )
    }
}

export default SingerList