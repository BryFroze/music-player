import React, { Component } from 'react'
import './style/rankList.css'
import jpg0 from './images/0.jpg'
import jpg1 from './images/1.jpg'
import jpg2 from './images/2.jpg'
import jpg3 from './images/3.jpg'
import jpg4 from './images/4.jpg'
import jpg5 from './images/5.jpg'
import jpg6 from './images/6.jpg'
import jpg7 from './images/7.jpg'
import jpg8 from './images/8.jpg'
import jpg9 from './images/9.jpg'
import jpg10 from './images/10.jpg'
import jpg11 from './images/11.jpg'
import jpg12 from './images/12.jpg'
import jpg13 from './images/13.jpg'
import jpg14 from './images/14.jpg'
import jpg15 from './images/15.jpg'
import jpg16 from './images/16.jpg'
import jpg17 from './images/17.jpg'
import jpg18 from './images/18.jpg'
import jpg19 from './images/19.jpg'
import jpg20 from './images/20.jpg'
import jpg21 from './images/21.jpg'

class RankList extends Component {
    constructor() {
        super()
        this.state = {
            rankList: [
                {
                    name: '云音乐新歌榜',
                    img: jpg0
                },
                {
                    name: '云音乐热歌榜',
                    img: jpg1
                },
                {
                    name: '原创歌曲榜',
                    img: jpg2
                },
                {
                    name: '云音乐飙升榜',
                    img: jpg3
                },
                {
                    name: '云音乐电音榜',
                    img: jpg4
                },
                {
                    name: 'UK排行榜周榜',
                    img: jpg5
                },
                {
                    name: 'Billboard周榜',
                    img: jpg6
                },
                {
                    name: 'KTV嗨榜',
                    img: jpg7
                },
                {
                    name: 'iTunes榜',
                    img: jpg8
                },
                {
                    name: 'Hit FM Top榜',
                    img: jpg9
                },
                {
                    name: '日本Oricon周榜',
                    img: jpg10
                },
                {
                    name: '韩国Melon排行榜周榜',
                    img: jpg11
                },
                {
                    name: '韩国Mnet排行榜周榜',
                    img: jpg12
                },
                {
                    name: '韩国Melon原声周榜',
                    img: jpg13
                },
                {
                    name: 'TOP排行榜(港台榜)',
                    img: jpg14
                },
                {
                    name: 'TOP排行榜(内地榜)',
                    img: jpg15
                },
                {
                    name: '香港电台中文歌曲龙虎榜',
                    img: jpg16
                },
                {
                    name: '华语金曲榜',
                    img: jpg17
                },
                {
                    name: '中国嘻哈榜',
                    img: jpg18
                },
                {
                    name: '法国 NRJ EuroHot 30周榜',
                    img: jpg19
                },
                {
                    name: '台湾Hito排行榜',
                    img: jpg20
                },
                {
                    name: '全球电子舞曲榜',
                    img: jpg21
                },
            ]
        }
    }
    render () {
        return (
            <div className="rank_list">
                {
                    this.state.rankList.map((item, index, arr) => {
                        if (index%3 === 0 ) {
                            return (
                                <div className="line" key={index}>
                                    <p>
                                        <img src={arr[index].img} alt="" />
                                        <span>{arr[index].name}</span>
                                    </p>
                                    {
                                        arr[index+1] ? (
                                        <p>
                                            <img src={arr[index+1].img} alt="" />
                                            <span>{arr[index+1].name}</span>
                                        </p>
                                        ) :
                                        (<p></p>)
                                    }
                                    {
                                        arr[index+2] ? (
                                        <p>
                                            <img src={arr[index+2].img} alt="" />
                                            <span>{arr[index+2].name}</span>
                                        </p>
                                        ) :
                                        (<p></p>)
                                    }
                                </div>
                            )
                        } else {
                            return ''
                        }
                    })
                }
            </div>
        )
    }
}

export default RankList