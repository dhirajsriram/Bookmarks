import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Container } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import IconButton from '@material-ui/core/IconButton';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles((theme) => ({
	home: {
		fontSize: 24,
		marginTop: 40
	},
	media:{
		"@media (max-width: 600px)": {
			margin:"20px 0px"
		  }
	},
	root: {
		padding: theme.spacing(3, 2)
	},
	menuButton: {
		marginRight: theme.spacing(2)
	},
	favourite:{
		color:"red"
	}
}));

const Home = (props) => {
	let bookmarks = [];
	const classes = useStyles();
	function handleBookmark(value) {
		bookmarks = value;
		props.onBookmark(bookmarks);
	}

	return (
		<div className={classes.home}>
			{props.book &&
			props.book[0].id && (
				<Container>
					<Paper className={classes.root}>
						<Grid container justify="space-between">
							<Grid item md={6}>
								<Typography variant="h4" fontWeight="fontWeightBold" component="h2">
									{props.book[0].volumeInfo.title} 
									<IconButton aria-label="add to favorites" color={props.bookmarks.some(bookmark => bookmark.id === props.book[0].id) ? "secondary":"default"} onClick={(e) => handleBookmark(props.book[0])}>
										<FavoriteIcon />
									</IconButton>
								</Typography>
								<Typography component="p">{props.book[0].volumeInfo.description}</Typography>
							</Grid>

							<Grid item md={2}>
								<img
									className={classes.media}
									alt="book-img"
									src={props.book[0].volumeInfo.imageLinks.thumbnail}
								/>
							</Grid>
						</Grid>
					</Paper>
				</Container>
			)}
		</div>
	);
};

export default Home;
