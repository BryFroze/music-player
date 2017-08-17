import React, { Component } from 'react'
import './style/index.css'
import findIcon from './img/find.svg'
import findIconActive from './img/find_active.svg'
import myMusicIcon from './img/my_music.svg'
import myMusicIconActive from './img/my_music_active.svg'

class Tab extends Component {
    constructor() {
        super()
        this.state = {
            tab: 0
        }
    }
    tabNavigate(match) {
        switch(match.path) {
            case "/":
                this.setState({
                    tab: 0
                })
                break
            case "/list":
                this.setState({
                    tab: 1
                })
                break
            default:
                break
        }
    }
    toRouter = path => {
        if (this.props.match !== path) {
            this.props.history.push({
                pathname: path
            })
        }
    }
    componentDidMount() {
        this.tabNavigate(this.props.match)
    }
    render () {
        return (
            <div className="tab border">
                <div
                    onClick={() => this.toRouter('/')}
                    className={this.state.tab === 0 ? "tab_cell active" : "tab_cell"}>
                    {this.state.tab === 0 ? 
                        <img src={findIconActive} alt="" /> :
                        <img src={findIcon} alt="" />
                    }
                    <span>发现音乐</span>
                </div>
                <div
                    onClick={() => this.toRouter('/list')}
                    className={this.state.tab === 1 ? "tab_cell active" : "tab_cell"}>
                    {this.state.tab === 1 ? 
                        <img src={myMusicIconActive} alt="" /> :
                        <img src={myMusicIcon} alt="" />
                    }
                    <span>我的音乐</span>
                </div>
            </div>
        )
    }
}

export default Tab