import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import FavoriteIcon from '@material-ui/icons/Favorite';
import DeleteIcon from '@material-ui/icons/Delete';
import Box from '@material-ui/core/Box';
import { withRouter } from 'react-router';

const useStyles = makeStyles((theme) => ({
	card: {
		maxWidth: 345
	},
	pointer: {},
	media: {
		height: 0,
		paddingTop: '56.25%', // 16:9
		cursor: 'pointer'
	},
	header: {
		cursor: 'pointer'
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest
		}),
		fontStyle:"Italic",
		color:"#3c3c3c"
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
	const [ expanded, setExpanded ] = React.useState(false);

	function handleExpandClick() {
		setExpanded(!expanded);
	}

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
					className={clsx(classes.expand, {
						[classes.expandOpen]: expanded
					})}
				>- {props.info.volumeInfo.authors[0]}</Typography>
			</CardActions>
			<Collapse in={expanded} timeout="auto" unmountOnExit>
				<CardContent>
					<Box fontWeight="fontWeightBold" fontSize={20} m={2}>
						Description
					</Box>
					<Typography paragraph>{props.info.volumeInfo.description}</Typography>
				</CardContent>
			</Collapse>
		</Card>
	);
};

export default withRouter(Book);
