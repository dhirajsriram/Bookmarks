import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Book from '../common/Book';
import { Container } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

let bookmarks = [];
const useStyles = makeStyles((theme) => ({
	home: {
		textAlign: 'center',
		fontSize: 24,
		marginTop: 40
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	error: {
		fontSize: 20,
		margin: 'auto'
	},
	fab: {
		position: 'absolute',
		bottom: 20,
		right: 20
	}
}));

const Bookmarks = (props) => {
	function handleBookmarkDelete(value) {
		bookmarks = value;
		props.onBookmarkDelete(bookmarks);
	}
	const classes = useStyles();
	return (
		<Container>
			<div className={classes.home}>
				<h1>Bookmarks</h1>
				<div className={classes.root}>
					<Grid container spacing={3}>
						{props.books.length > 0 ? (
							props.books.map((book, index) => {
								return (
									<Grid item xs={12} sm={6} md={3} key={index}>
										<Book info={book} onBookmarkDelete={handleBookmarkDelete} />
									</Grid>
								);
							})
						) : (
							<Typography align="center" className={classes.error} variant="h4" component="h4">
								There are no books added to the bookmarks yet. Add some to view them here
							</Typography>
						)}
					</Grid>
				</div>
			</div>
			{props.books.length > 0 && (
				<Fab color="secondary" aria-label="add" className={classes.fab}>
					<Icon>play_arrow</Icon>
				</Fab>
			)}
		</Container>
	);
};

export default Bookmarks;
