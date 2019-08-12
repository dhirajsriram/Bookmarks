import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Loader from "../common/Loader";

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

const Bookmarks = () => {
	const [ books ] = useState({});
	
	const classes = useStyles();
	return (
		<div className={classes.home}>
			<h1>Bookmarks</h1>
			<div className={classes.root}>
				<Grid container spacing={3} margin={2}>
					{books.totalItems ?
						books.items.map((book, index) => {
							return (
								<div></div>
							);
						}) : <Loader></Loader>}
				</Grid>
			</div>
		</div>
	);
};

export default Bookmarks;
