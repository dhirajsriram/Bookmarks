import React, { useState, useEffect } from 'react';
import './App.css';
import Menu from './common/Menu';
import Home from './Pages/Home';
import Bookmarks from './Pages/Bookmarks';
import Categories from './Pages/Categories';
import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import Snackbar from '@material-ui/core/Snackbar';

function App() {
	const [ books, setBooks ] = useState({});
	const [ state, setState ] = React.useState({
		open: false,
		vertical: 'top',
		horizontal: 'center'
	});
	const [ bookmarks, setBookmarks ] = useState([]);

	const { vertical, horizontal, open } = state;

	function handleClose() {
		setState({ ...state, open: false });
	}
	useEffect(() => {
		fetchBooks();
	}, []);

	function fetchBooks() {
		fetch('https://content.googleapis.com/books/v1/volumes?maxResults=40&q=harry').then(function(response) {
			response.text().then(function(text) {
				setBooks(JSON.parse(text));
			});
		});
	}

	function handleBookmarks(value) {
		if (bookmarks.length > 0) {
			if (!bookmarks.find((x) => x.id === value.id)) {
				setBookmarks([ ...bookmarks, value ]);
			}
		} else {
			setBookmarks([ ...bookmarks, value ]);
		}
	}

	return (
		<div className="App">
			{console.log(bookmarks)}
			<header className="App-header">
				<Menu count={bookmarks.length} />
			</header>
			<Route path="/" exact render={(props) => <Home onBookmark={handleBookmarks} books={books} />} />
			<Route path="/categories" render={(props) => <Categories onBookmark={handleBookmarks} books={books} />} />
			<Route path="/bookmarks" render={(props) => <Bookmarks books={bookmarks} />} />
			<div>
				<Snackbar
					anchorOrigin={{ vertical, horizontal }}
					key={`${vertical},${horizontal}`}
					open={open}
					onClose={handleClose}
					ContentProps={{
						'aria-describedby': 'message-id'
					}}
					message={<span id="message-id">Book added to bookmarks</span>}
				/>
			</div>
		</div>
	);
}

export default withRouter(App);
