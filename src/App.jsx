import React, { useState, useEffect } from 'react';
import './App.css';
import Menu from './common/Menu';
import Home from './Pages/Home';
import Bookmarks from './Pages/Bookmarks';
import Categories from './Pages/Categories';
import { Route } from 'react-router-dom';
import { withRouter } from "react-router";
function App() {
	const [ books, setBooks ] = useState({});
	useEffect(() => {
		fetchBooks();
	},[]);

	function fetchBooks() {
		fetch('https://content.googleapis.com/books/v1/volumes?maxResults=40&q=harry').then(function(response) {
			response.text().then(function(text) {
				setBooks(JSON.parse(text));
			});
		});
	}

	return (
		<div className="App">
			<header className="App-header">
				<Menu />
				<Route path="/" exact render={(props) =><Home books={books}></Home>} />
				<Route path="/categories" render={(props) =><Categories books={books}></Categories>} />
				<Route path="/bookmarks" render={(props) =><Bookmarks books={books}></Bookmarks>} />
			</header>
		</div>
	);
}

export default withRouter(App);
