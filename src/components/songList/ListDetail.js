import React, { Component } from 'react'
import PropsTypes from 'prop-types'
import './style/ListDetail.css'

class ListDetail extends Component {
    static propsTypes = {
        switchListDetail: PropsTypes.func
    }
    render () {
        return (
            <div className="list_detail">
                <div className="list_creator">
                    <div className="list_blur_bac" style={{backgroundImage: `url(${this.props.imgUrl}`}}></div>
                    <div className="detail_header border">
                        <p onClick={this.props.switchListDetail.bind(null, false)}> {"<"} </p>
                        <p>歌单</p>
                    </div>
                    <div className="list_creator_info">
                        <p>
                            <img src={this.props.imgUrl} alt="" />
                        </p>
                        <p>
                            <span>
                                光影留声
                            </span>
                            <span>
                                <img src={""} alt="" />
                                <b>谍影丛重</b>
                            </span>
                        </p>
                    </div>
                </div>
                <div className="detail_content">
                    
                    <div className="content_song_list">

                    </div>
                </div>
            </div>
        )
    }
}

export default ListDetail