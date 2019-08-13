import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import { withRouter } from 'react-router';

const useStyles = makeStyles((theme) => ({
	pointer: {},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
		cursor: 'pointer'
	},
	header: {
		cursor: 'pointer',
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest
		}),
		fontStyle:"Italic",
		color:"#3c3c3c9e"
	},
	expandOpen: {
		transform: 'rotate(180deg)'
	},
	avatar: {
		backgroundColor: red[500]
	}
}));

const Book = (props) => {
	const classes = useStyles();
	function handleFavourite() {
		var lang = props.info;
		props.onBookmark(lang);
	}

	function handleFavouriteDelete() {
		var lang = props.info;
		props.onBookmarkDelete(lang);
	}

	function handleBookClick() {
		props.history.push('/book/' + props.info.id);
	}

	return (
		<Card className={classes.card} color="primary">
			<CardHeader
				onClick={() => handleBookClick()}
				className={classes.header}
				title={props.info.volumeInfo.title}
			/>
			<CardMedia
				onClick={() => handleBookClick()}
				className={classes.media}
				image={props.info.volumeInfo.imageLinks.thumbnail}
			/>
			<CardActions disableSpacing>
				{window.location.pathname.indexOf('bookmarks') > -1 ? (
					<IconButton onClick={(e) => handleFavouriteDelete()}>
						<DeleteIcon />
					</IconButton>
				) : (
					<IconButton color={props.bookmarks.some(bookmark => bookmark.id === props.info.id) ? "secondary":"default"} onClick={(e) => handleFavourite()}>
						<FavoriteIcon />
					</IconButton>
				)}
				<Typography fontStyle="italic"
					className={clsx(classes.expand)}
				>- {props.info.volumeInfo.authors[0]}</Typography>
			</CardActions>
		</Card>
	);
};

export default withRouter(Book);
