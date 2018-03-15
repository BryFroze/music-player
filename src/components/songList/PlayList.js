import React, { Component } from 'react'
import MusicListCell from './MusicListCell'
import './style/playList.css'
import { observer } from 'mobx-react'

@observer
class PlayList extends Component {
    render () {
        return (
            <div className="list_wrapper">
                {this.props.songList.listData.map((item, index) => {
                    return (
                        <MusicListCell
                            cellData={item}
                            key={item.id}
                            switchListDetail={this.props.switchListDetail} />
                    )
                })}
            </div>
        )
    }
}

export default PlayList