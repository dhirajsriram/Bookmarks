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
	let closeSnack = {
		open: false,
		vertical: 'bottom',
		horizontal: 'center'
	};
	let openSnack = {
		open: true,
		vertical: 'bottom',
		horizontal: 'center'
	};
	const [ books, setBooks ] = useState({});
	const [ state, setState ] = React.useState(closeSnack);
	const [ bookmarks, setBookmarks ] = useState([]);

	const { vertical, horizontal, open } = state;
	useEffect(() => {
		fetch('https://content.googleapis.com/books/v1/volumes?maxResults=40&q=blinklist').then(function(response) {
			response.text().then(function(text) {
				setBooks(JSON.parse(text));
			});
		});
	}, []);

	function handleBookmarks(value) {
		setState({
			...openSnack,
			message: '<i class="material-icons">check_circle</i> Book added to bookmarks'
		});
		if (bookmarks.length > 0) {
			if (!bookmarks.find((x) => x.id === value.id)) {
				setBookmarks([ ...bookmarks, value ]);
			} else {
				setState({
					...openSnack,
					message: '<i class="material-icons">error</i>  Book already bookmarked '
				});
			}
		} else {
			setBookmarks([ ...bookmarks, value ]);
		}
		setTimeout(() => {
			setState(closeSnack);
		}, 750);
	}

	function handleBookmarksDelete(value) {
		if (bookmarks.length > 0) {
			let bookmarkArr = bookmarks;
			bookmarkArr.splice(bookmarkArr.indexOf(bookmarks.find((x) => x.id === value.id)), 1);
			setState({
				...openSnack,
				message: '<i class="material-icons">delete_forever</i> Book removed from bookmarks'
			});
			setTimeout(() => {
				setState(closeSnack);
			}, 600);
		}
	}

	return (
		<div className="App">
			<header className="App-header">
				<Menu count={bookmarks.length} />
			</header>
			<Route path="/" exact render={(props) => <Home bookmarks={bookmarks} onBookmark={handleBookmarks} books={books} />} />
			<Route
				path="/book/:id"
				render={(props) => (
					<Description
					bookmarks={bookmarks}
						onBookmark={handleBookmarks}
						book={
							books.items &&
							books.items.filter((book) => book.id === window.location.pathname.replace('/book/', ''))
						}
					/>
				)}
			/>
			<Route path="/categories" render={(props) => <Categories onBookmark={handleBookmarks} books={books} bookmarks={bookmarks} />} />
			<Route
				path="/bookmarks"
				render={(props) => <Bookmarks books={bookmarks} onBookmarkDelete={handleBookmarksDelete} />}
			/>
			<div>
				<Snackbar
					color="primary"
					anchorOrigin={{ vertical, horizontal }}
					key={`${vertical},${horizontal}`}
					open={open}
					ContentProps={{
						'aria-describedby': 'message-id'
					}}
					message={<div id="message-id" dangerouslySetInnerHTML={{__html:state.message}}></div>}
				/>
			</div>
		</div>
	);
}

export default withRouter(App);
