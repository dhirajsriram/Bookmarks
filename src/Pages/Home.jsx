import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Book from '../common/Book';
import Grid from '@material-ui/core/Grid';
import Loader from '../common/Loader';

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

const Home = (props) => {
	let bookmarks = []
	const classes = useStyles();
	function handleBookmark(value) {
		bookmarks = value
		props.onBookmark(bookmarks)
	}
	
	return (
		<div className={classes.home}>
			<Container>
				<h1>Welcome to this sample book app!</h1>
				<div className={classes.root}>
					<Grid container spacing={3}>
						{props.books.totalItems ? (
							props.books.items.map((book, index) => {
								return (
									<Grid item xs={12} md={3} key={index}>
										<Book bookmarks={props.bookmarks} onBookmark={handleBookmark} info={book} />
									</Grid>
								);
							})
						) : (
							<Loader />
						)}
					</Grid>
				</div>
			</Container>
		</div>
	);
};

export default Home;
