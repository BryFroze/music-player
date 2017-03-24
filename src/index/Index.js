import React, { Component } from 'react';
import './index.css'

class Index extends Component {
	constructor (props) {
		super(props);
		this.state = {
			title: 'my first component'
		}
	}

	componentDidMount() {
		this.timerID = setTimeout(
			() => this.changeTitle(),
			3000
		);
	}

	changeTitle() {
		this.setState({
			title: "3秒后更新了DOM"
		});
	}
	render() {
		return (
			<div className="index">
				{this.state.title}
			</div>
		)
	}
}

export default Index;