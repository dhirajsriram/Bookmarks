import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Loader from '../common/Loader';
import Book from '../common/Book';
import Chip from '@material-ui/core/Chip';

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

const Categories = (props) => {
	const [ books, setBooks ] = useState([]);
	let bookmarks = [];
	const [ categories, setCategories ] = useState([]);
	const [ bookList, setBookList ] = useState({});
	function handleBookmark(value) {
		bookmarks = value;
		props.onBookmark(bookmarks);
	}
	let onBookmark = props.onBookmark;
	useEffect(
		() => {
			setBooks(props.books);
			let arr = [];
			for (let x in props.books.items) {
				if (props.books.items[x].volumeInfo && props.books.items[x].volumeInfo.categories) {
					arr.push(props.books.items[x].volumeInfo.categories[0]);
				}
			}
			arr = [ ...new Set(arr) ];
			setCategories(arr);
		},
		[ props.books, onBookmark ]
	);

	function handleCategory(category) {
		var x = books.items.filter(
			(items) => (items.volumeInfo.categories && items.volumeInfo.categories[0] === category ? items : null)
		);
		setBookList(x);
	}

	const classes = useStyles();
	return (
		<div className={classes.home}>
			<Container>
				<h1>Categories</h1>
				<Grid container spacing={1}>
					{categories.length > 0 ? (
						categories.map((category, index) => {
							return (
								<Grid item key={index}>
									<Chip
										label={category}
										className={classes.chip}
										component="a"
										clickable
										onClick={(e) => handleCategory(category)}
										color="secondary"
									/>
								</Grid>
							);
						})
					) : (
						<Loader />
					)}
				</Grid>
				{bookList.length > 0 && (
					<React.Fragment>
						<h1>Books</h1>
						<Grid container spacing={3}>
							{bookList.map((book, index) => {
								return (
									<Grid item xs={12} sm={6} md={3} key={index}>
										<Book bookmarks={props.bookmarks} onBookmark={handleBookmark} info={book} />
									</Grid>
								);
							})}
						</Grid>
					</React.Fragment>
				)}
			</Container>
		</div>
	);
};

export default Categories;
