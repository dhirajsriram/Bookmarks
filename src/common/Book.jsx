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
import Box from '@material-ui/core/Box';

const useStyles = makeStyles((theme) => ({
	card: {
		maxWidth: 345
	},
	media: {
		height: 0,
		paddingTop: '56.25%',
		backgroundSize: 'auto' // 16:9
	},
	expand: {
		transform: 'rotate(0deg)',
		marginLeft: 'auto',
		transition: theme.transitions.create('transform', {
			duration: theme.transitions.duration.shortest
		})
	},
	expandOpen: {
		transform: 'rotate(180deg)'
	},
	avatar: {
		backgroundColor: red[500]
	}
}));

export default function Book(props) {
	const classes = useStyles();
	const [ expanded, setExpanded ] = React.useState(false);

	function handleExpandClick() {
		setExpanded(!expanded);
	}

	return (
		<Card className={classes.card} color="primary">
			<CardHeader className={classes.header} title={props.info.volumeInfo.title} />
			<CardMedia className={classes.media} image={props.info.volumeInfo.imageLinks.thumbnail} />
			<CardActions disableSpacing>
				<IconButton aria-label="add to favorites">
					<FavoriteIcon />
				</IconButton>
				<IconButton
					className={clsx(classes.expand, {
						[classes.expandOpen]: expanded
					})}
					onClick={handleExpandClick}
					aria-expanded={expanded}
					aria-label="show more"
				>
					<ExpandMoreIcon />
				</IconButton>
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
}
