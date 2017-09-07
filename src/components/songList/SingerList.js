import React, { Component } from 'react'
import './style/singerList.css'
import SingerInfo from 'container/songList/SingerInfo'

class SingerList extends Component {
    constructor() {
        super()
        this.state = {
            singerList: [],
            isShowInfo: false,
            singerId: 0
        }
    }
    getSingerList(key, data) {
        this.props.getData(key, data).then(res => {
            this.props.updateSingerList(res.artists)
        })
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
            isShowInfo: !this.state.isShowInfo
        })
    }
    componentDidMount() {
        let list = this.props.singerList
        if (!list.length) {
            this.getSingerList('/top/artists', 'offset=0&limit=100')
        } else {
            this.setState({
                singerList: list
            })
        }
    }
    render () {
        return (
            <div className="singer_container">
                <ul>
                    {
                        this.props.singerList.map((item, index) => {
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
                    this.state.isShowInfo && <SingerInfo switchInfo={this.switchInfo} id={this.state.singerId}/>
                }
            </div>
        )
    }
}

export default SingerList