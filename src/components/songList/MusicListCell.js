import React, { Component } from 'react'
import './style/listCell.css'
import PropTypes from 'prop-types'

class MusicListCell extends Component {
    static propTypes = {
        cellData: PropTypes.object,
        switchListDetail: PropTypes.func
    }
    render () {
        return (
            <div className="list_cell" onClick={this.props.switchListDetail.bind(null, true,this.props.cellData)}>
                <div className="background">
                    <img src={this.props.cellData.coverImgUrl} alt="" />
                </div>
                <div className="list_title">
                    {this.props.cellData.name}
                </div>
            </div>
        )
    }
}

export default MusicListCell