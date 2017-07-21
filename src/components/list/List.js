import React, { Component } from 'react'
import qs from 'qs'
import axios from 'axios'

class List extends Component {
    constructor () {
        super()
    }
    componentDidMount() {
        // id: 255161903  歌单id：319907008
        // axios.get(`/playlist/detail?id=319907008`).then(res => {
        //     console.log(res.data)
        // })
        // 获取歌曲详情
        // axios.get(`/song/detail?ids=35470197`).then(res => {
        //     console.log(res.data)
        // })
        // 获取歌曲评论
        axios.post(`http://www.by2z.cn/api/comment/music?id=35470197&limit=100`).then(res => {
            console.log("歌曲评论",res.data)
            res.data.comments.forEach(item => {
                if (item.commentId === '475100631') {
                    console.log(item.content, item.likedCount)
                    return
                }
            })
        })
        // 登录
        // axios.get(`/login/cellphone?phone=18879776081&password=hlh776081`).then(res => {
            // console.log("登录成功", res.data)
            // 给歌曲评论点赞
        // })
    }
    render () {
        return (
            <div className="list">
                list
            </div>
        )
    }
}

export default List