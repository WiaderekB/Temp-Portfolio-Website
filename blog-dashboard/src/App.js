import React, { Component } from "react";
import "./app.css";
import Posts from "./posts";
import Websites from "./websites";

export default class App extends Component {
	state = {
		show: "Posts",
	};
	render() {
		return (
			<>
				<div id="buttons">
					<button className={this.state.show === "Posts" ? "active" : null} onClick={() => this.setState({ show: "Posts" })}>
						Posts
					</button>
					<button className={this.state.show === "Websites" ? "active" : null} onClick={() => this.setState({ show: "Websites" })}>
						Websites
					</button>
				</div>
				{this.state.show === "Posts" ? <Posts /> : <Websites />}
			</>
		);
	}
}
