import React, { Component } from 'react'
import './style/header.css'
import PropTypes from 'prop-types'

class SongListHeader extends Component {
    static propTypes = {
        tab: PropTypes.number,
        changeTab: PropTypes.func
    }
    render () {
        return (
            <div className="tab_header border">
                <p className={this.props.tab === 0 && "active border"} onClick={() => this.props.changeTab(0)}>歌单</p>
                <p className={this.props.tab === 1 && "active border"} onClick={() => this.props.changeTab(1)}>歌手</p>
                <p className={this.props.tab === 2 && "active border"} onClick={() => this.props.changeTab(2)}>排行榜</p>
            </div>
        )
    }
}

export default SongListHeader