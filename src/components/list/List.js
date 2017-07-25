import React, { Component } from 'react'
import './style/list.css'
// import ajaxUtil from '../../utils/ajax'

class List extends Component {
    // 歌单id: 319907008
    // /api/search?keywords=海阔天空
    getList = () => {
        this.props.getListData('/playlist/detail', 'id=319907008')
    }
    toPlay = (id) => {
        this.props.history.push({
            pathname: `play/${id}`
        })
    }
    generateList = () => {
        if (this.props.list.listData.playlist) {
            return (
                <ul>
                    {this.props.list.listData.playlist.tracks.map((item, index) => {
                        return (
                            <li key={item.id} className="border" onClick={this.toPlay.bind(this, item.id)}>
                                <p>
                                    {index}
                                </p>
                                <p className="music_name">
                                    <span>
                                        {item.name}
                                    </span>
                                    <span>
                                        {item.ar[0].name + ' - ' + item.al.name}
                                    </span>
                                </p>
                            </li>
                        )
                    })}
                </ul>
            )
        }
    }
    componentDidMount() {
        this.getList()
    }
    render () {
        return (
            <div className="list">
                <header className="border">
                    {this.props.list.title}
                </header>
                <section>
                     {this.generateList()} 
                </section>
            </div>
        )
    }
}

export default List