import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Button from '@material-ui/core/Button';
import {Link} from "react-router-dom"
const useStyles = makeStyles((theme) => ({
	root: {
        flexGrow: 1
	},
	menuButton: {
		marginRight: theme.spacing(2)
	}
}));

export default function MenuAppBar() {
	const classes = useStyles();
	const [ auth ] = React.useState(true);

	return (
		<div className={classes.root}>
			<AppBar position="static" color="default">
				<Toolbar>
					<Typography variant="h6" className={classes.title}>
						<Button color="default" className={classes.button}>
							<Link to="/" className="default-text">Home</Link>
						</Button>
					</Typography>
					<Typography variant="h6" className={classes.title}>
						<Button color="default" className={classes.button}>
						<Link to="/categories" className="default-text">Categories</Link>
						</Button>
					</Typography>
					<Typography variant="h6" className={classes.title}>
						<Button color="default" className={classes.button}>
						<Link to="/bookmarks" className="default-text">Bookmarks</Link>
						</Button>
					</Typography>
					{auth && (
						<div>
							<IconButton
								aria-label="account of current user"
								aria-controls="menu-appbar"
								aria-haspopup="true"
								color="inherit"
							>
								<AccountCircle />
							</IconButton>
						</div>
					)}
				</Toolbar>
			</AppBar>
		</div>
	);
}
