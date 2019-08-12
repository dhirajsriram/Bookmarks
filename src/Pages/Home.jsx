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
	const [ bookmarks, setBookmarks ] = React.useState([]);
	const classes = useStyles();
	function handleBookmark(value) {
		setBookmarks([ ...bookmarks, value ]);
	}
    let onBookmark = props.onBookmark
	React.useEffect(()=>{
		if(bookmarks.length > 0){
		onBookmark(bookmarks);
	}
	},[bookmarks,onBookmark])

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
										<Book onBookmark={handleBookmark} info={book} />
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
