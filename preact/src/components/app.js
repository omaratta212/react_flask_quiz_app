import { Component } from 'preact';
import { Router } from 'preact-router';

import Header from './header';
import Footer from './footer';

// Code-splitting is automated for routes
import Home from '../routes/home';
import Add from '../routes/add';
import Play from '../routes/play';

export default class App extends Component {

	/** Gets fired when the route changes.
	 *	@param {Object} event		"change" event from [preact-router](http://git.io/preact-router)
	 *	@param {string} event.url	The newly routed URL
	 */
	handleRoute = e => {
		this.currentUrl = e.url;
	};

	render() {
		return (
			<div id="app" className="bg-gray-900 min-h-screen flex flex-col">
				<Header />
				<Router onChange={this.handleRoute}>
					<Home path="/" />
					<Add path="/add" />
					<Play path="/play" />
				</Router>
				<Footer />
			</div>
		);
	}
}
