import React, { useState, useEffect } from 'react';
import './App.css';
import Menu from './common/Menu';
import Home from './Pages/Home';
import Bookmarks from './Pages/Bookmarks';
import Categories from './Pages/Categories';
import Description from './Pages/Description';

import { Route } from 'react-router-dom';
import { withRouter } from 'react-router';
import Snackbar from '@material-ui/core/Snackbar';

function App() {
	const [ books, setBooks ] = useState({});
	const [ state, setState ] = React.useState({
		open: false,
		vertical: 'bottom',
		horizontal: 'center'
	});
	const [ bookmarks, setBookmarks ] = useState([]);

	const { vertical, horizontal, open } = state;
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
		setState({
			open: true,
			vertical: 'bottom',
			horizontal: 'center',
			message: "Book added to bookmarks ✔️"
		});
		if (bookmarks.length > 0) {
			if (!bookmarks.find((x) => x.id === value.id)) {
				setBookmarks([ ...bookmarks, value ]);
			} else {
				setState({
					open: true,
					vertical: 'bottom',
					horizontal: 'center',
					message: "Book already bookmarked ⚠️"
				});
			}
		} else {
			setBookmarks([ ...bookmarks, value ]);
		}
		setTimeout(() => {
			setState({
				open: false,
				vertical: 'bottom',
				horizontal: 'center'
			});
		}, 1000);
	}

	function handleBookmarksDelete(value){
		setState({
			open: true,
			vertical: 'bottom',
			horizontal: 'center',
			message: false
		});
		if (bookmarks.length > 0) {
			let bookmarkArr = bookmarks
			bookmarkArr.splice(bookmarkArr.indexOf(bookmarks.find((x) => x.id === value.id)),1)
			setState({
				open: true,
				vertical: 'bottom',
				horizontal: 'center',
				message: "Book removed from bookmarks ❌"
			});
		setTimeout(() => {
			setState({
				open: false,
				vertical: 'bottom',
				horizontal: 'center'
			});
		}, 1000);
	}
}

	return (
		<div className="App">
			<header className="App-header">
				<Menu count={bookmarks.length} />
			</header>
			<Route path="/" exact render={(props) => <Home onBookmark={handleBookmarks} books={books} />} />
			<Route
				path="/book/:id"
				render={(props) => (
					<Description
						onBookmark={handleBookmarks}
						book={
							books.items &&
							books.items.filter((book) => book.id === window.location.pathname.replace('/book/', ''))
						}
					/>
				)}
			/>
			<Route path="/categories" render={(props) => <Categories onBookmark={handleBookmarks} books={books} />} />
			<Route path="/bookmarks" render={(props) => <Bookmarks books={bookmarks} onBookmarkDelete={handleBookmarksDelete}/>} />
			<div>
				<Snackbar
					color="primary"
					anchorOrigin={{ vertical, horizontal }}
					key={`${vertical},${horizontal}`}
					open={open}
					ContentProps={{
						'aria-describedby': 'message-id'
					}}
					message={
						<div id="message-id">{state.message}</div>
					}
				/>
			</div>
		</div>
	);
}

export default withRouter(App);
