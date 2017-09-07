import React, { Component } from 'react'
import './style/singerInfo.css'

class SingerInfo extends Component {
    constructor() {
        super()
        this.state = {
            singerInfo: {
                artist: {}
            },
            infoTab: 0,
            tabArr: ['热门', '专辑', '歌手介绍']
        }
    }
    getSingerInfo(key, data) {
        this.props.getData(key, data).then(res => {
            this.setState({
                singerInfo: res
            })
        })
    }
    componentDidMount() {
        this.getSingerInfo('/artists', `id=${this.props.id}`)
    }
    render () {
        return (
            <div className="singer_info">
                <div className="singer_header" style={{backgroundImage: `url(${this.state.singerInfo.artist.img1v1Url || ''})`}}>
                    <p className="title">
                        <span onClick={this.props.switchInfo}>{'<'}</span>
                        <span>
                            {this.state.singerInfo.artist.name}
                        </span>
                    </p>
                </div>
                <div className="singer_content">
                    <div className="singer_tab">
                        {
                            this.state.tabArr.map((item, index) => (
                                <span className={this.state.infoTab === index && 'active border'} key={index}>
                                    {item}
                                </span>
                            ))
                        }
                    </div>
                </div>
            </div>
        )
    }
}

export default SingerInfo