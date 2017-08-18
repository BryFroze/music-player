import React, { Component } from 'react'
import './spinner.css'
let Spinner = require('react-spinkit')

class SpinnerCustom extends Component {
    render () {
        return (
            <div className={this.props.loading ? "loading" : "loading_hide"}>
                {this.props.loading && <Spinner name="cube-grid" color="orange" />}
            </div>
        )
    }
}

export default SpinnerCustom