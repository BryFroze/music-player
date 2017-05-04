import { connect } from 'react-redux'
import React, { Component } from 'react'
import { test } from '../actions/action'

class App extends Component {
    consoleData() {

    }
    render() {
        console.log(this.props)
        const { dispatch } = this.props
        return (
            <div>
                <div onClick={text => dispatch(test('我修改了redux数据'))}>
                    点击触发redux
                </div>
                <div onClick={() => console.log(this.props)}>
                    查看数据
                </div>
            </div>
        )
    }
}

export default connect()(App)