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

const Categories = (props) => {
	const [ books, setBooks ] = useState([]);
	const [ categories, setCategories ] = useState([]);
	const [ bookList, setBookList ] = useState({});
	const [ bookmarks, setBookmarks ] = React.useState([]);
	function handleBookmark(value) {
		setBookmarks([ ...bookmarks, value ]);
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
			if (bookmarks.length > 0) {
				onBookmark(bookmarks);
			}
		},
		[ props.books, bookmarks, onBookmark ]
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
								<Grid item xs={12} md={4} key={index}>
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
					<React.Fragment>
						<h1>Books</h1>
						<Grid container spacing={3}>
							{bookList.map((book, index) => {
								return (
									<Grid item xs={12} md={3} key={index}>
										<Book onBookmark={handleBookmark} info={book} />
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
