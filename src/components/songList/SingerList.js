import React, { Component } from 'react'
import './style/singerList.css'

class SingerList extends Component {
    constructor() {
        super()
        this.state = {
            singerList: []
        }
    }
    getSingerList(key, data) {
        this.props.getData(key, data).then(res => {
            this.props.updateSingerList(res.artists)
        })
    }
    componentDidMount() {
        let list = this.props.singerList
        if (!list.length) {
            this.getSingerList('/top/artists', 'offset=0&limit=30')
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
                                <li key={item.id} className="border">
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
            </div>
        )
    }
}

export default SingerList