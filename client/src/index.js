import ReactDOM from 'react-dom';
import React from 'react';
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
		if(this.state.symbols.includes(symbol)) {
			alert('Symbol already searched!')
			return;
		}

		try {
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
		catch(err) {
			alert(err);
		}
	}
	
	render() {
		return(
		<div className="container">
			<div className="input-group mb-3">
				<input placeholder="Stock Symbol" className="form-control" ref={this.searchSymbolRef} type='text' onKeyDown={(e) => ( e.keyCode === 13 ? this.fetchMessages(this.searchSymbolRef.current.value) : console.log(false)) }/>
			</div>
			<Posts messages={this.state.messages} />
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
