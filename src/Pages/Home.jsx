import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Book from "../common/Book"
import Grid from '@material-ui/core/Grid';
const useStyles = makeStyles((theme) => ({
	home: {
		textAlign: 'center',
		fontSize: 24,
		marginTop: 40,
	},
	menuButton: {
		marginRight: theme.spacing(2)
	}
}));

const Home = () => {
	const [ books, setBooks ] = useState({});
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
	const classes = useStyles();
	return (
		<div className={classes.home}>
			<h1>Welcome to this sample book app!</h1>
			<div className={classes.root}>
				{console.log(books)}
				<Grid container spacing={3}>
					{console.log(books)}
					{books.totalItems &&
						books.items.map((book, index) => {
							return (
								<Grid item xs={12} md={3} key={index}>
									<Book info={book}></Book>
								</Grid>
							);
						})}
				</Grid>
			</div>
		</div>
	);
};

export default Home;
