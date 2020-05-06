import ReactDOM from 'react-dom';
import React from 'react';
import logo from './logo.svg';
import './styles/main.scss';

import Posts from './components/posts';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'font-awesome/css/font-awesome.min.css';
import 'bootstrap-social/bootstrap-social.css';

class App extends React.Component {
	constructor(props) {
		super(props);

		this.searchSymbolRef = React.createRef();

		this.state = {
			messages: [],
			symbols: []
		}
	}

	componentDidMount() {
		// this.fetchMessages('OIL');
	}

	fetchMessages = async (symbol) => {
		let response = await fetch(`http://localhost:8080/tweets/${symbol}`, {method: 'GET'});
		let body = await response.json();

		let new_symbols = this.state.symbols.concat(symbol);
		let new_messages = this.state.messages.concat(body.messages);

		this.setState({
			symbols: new_symbols,
			messages: new_messages
		});
		console.log(this.state.symbols, this.state.messages);
	}
	
	render() {
		return(
		<div className="App">
			<input ref={this.searchSymbolRef} type='text' onKeyDown={(e) => ( e.keyCode === 13 ? this.fetchMessages(this.searchSymbolRef.current.value) : console.log(false)) }/>
			<Posts messages={this.state.messages} />
			{/* <header className="App-header">
				<img src={logo} className="App-logo" alt="logo" />
				<p>
				Edit <code>src/App.js</code> and save to reload.
				</p>
				<a
				className="App-link"
				href="https://reactjs.org"
				target="_blank"
				rel="noopener noreferrer"
				>
				Learn React
				</a>
			</header> */}
		</div>
		)
	}
}

ReactDOM.render(
	<React.StrictMode>
		<App />
	</React.StrictMode>, 
	document.getElementById('root')
);
