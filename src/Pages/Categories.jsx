import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Button, Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Loader from '../common/Loader';
import Book from '../common/Book';

const useStyles = makeStyles((theme) => ({
	home: {
		textAlign: 'center',
		fontSize: 24,
		marginTop: 40
	},
	menuButton: {
		marginRight: theme.spacing(2)
	}
}));

const Categories = () => {
	const [ books, setBooks ] = useState([]);
	const [ categories, setCategories ] = useState([]);
	const [ bookList, setBookList ] = useState({});
	useEffect(() => {
		fetchBooks();
	}, []);

	Array.prototype.unique = function() {
		return this.filter(function(value, index, self) {
			return self.indexOf(value) === index;
		});
	};

	function handleCategory(category) {
		var x = books.items.filter(
			(items) => (items.volumeInfo.categories && items.volumeInfo.categories[0] === category ? items : null)
		);
		setBookList(x);
	}

	function fetchBooks() {
		fetch('https://content.googleapis.com/books/v1/volumes?maxResults=40&q=harry').then(function(response) {
			response.text().then(function(text) {
				var response = JSON.parse(text);
				setBooks(response);
				let arr = [];
				for (let x in response.items) {
					if (response.items[x].volumeInfo && response.items[x].volumeInfo.categories) {
						arr.push(response.items[x].volumeInfo.categories[0]);
					}
				}
				setCategories(arr.unique());
			});
		});
	}
	const classes = useStyles();
	return (
		<div className={classes.home}>
			<h1>Categories</h1>
			<Grid container spacing={1}>
				{categories.length > 0 ? (
					categories.map((category, index) => {
						return (
							<Grid item xs={12} md={2} key={index}>
								<Button
									variant="outlined"
									color="inherit"
									className={classes.button}
									onClick={(e) => handleCategory(category)}
								>
									{category}
								</Button>
							</Grid>
						);
					})
				) : (
					<Loader />
				)}
			</Grid>
			{bookList.length > 0 && (
                <Container>
                <h1>Books</h1>
				<Grid container spacing={3}>
					{bookList.map((book, index) => {
						return (
							<Grid item xs={12} md={3} key={index}>
								<Book info={book} />
							</Grid>
						);
					})}
				</Grid>
                </Container>
			)}
		</div>
	);
};

export default Categories;
