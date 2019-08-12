import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Loader from "../common/Loader";
import Book from "../common/Book"
import { Container } from '@material-ui/core';

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

const Bookmarks = (props) => {
	
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
									<Grid item xs={12} md={3} key={index}>
										<Book info={book} />
									</Grid>
								);
							})
						) : (
							<Loader />
						)}
					</Grid>
			</div>
		</div>
		</Container>
	);
};

export default Bookmarks;
