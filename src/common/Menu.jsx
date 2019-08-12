// import React from 'react';
// import { makeStyles } from '@material-ui/core/styles';
// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';
// import Typography from '@material-ui/core/Typography';
// import IconButton from '@material-ui/core/IconButton';
// import AccountCircle from '@material-ui/icons/AccountCircle';
// import Button from '@material-ui/core/Button';
// import {Link} from "react-router-dom"
// const useStyles = makeStyles((theme) => ({
// 	root: {
//         flexGrow: 1
// 	},
// 	menuButton: {
// 		marginRight: theme.spacing(2)
// 	}
// }));

// export default function MenuAppBar() {
// 	const classes = useStyles();
// 	const [ auth ] = React.useState(true);

// 	return (
// 		<div className={classes.root}>
// 			<AppBar position="static" color="default">
// 				<Toolbar>
// 					<Typography variant="h6" className={classes.title}>
// 						<Button color="default" className={classes.button}>
// 							<Link to="/" className="default-text">Home</Link>
// 						</Button>
// 					</Typography>
// 					<Typography variant="h6" className={classes.title}>
// 						<Button color="default" className={classes.button}>
// 						<Link to="/categories" className="default-text">Categories</Link>
// 						</Button>
// 					</Typography>
// 					<Typography variant="h6" className={classes.title}>
// 						<Button color="default" className={classes.button}>
// 						<Link to="/bookmarks" className="default-text">Bookmarks</Link>
// 						</Button>
// 					</Typography>
// 					{auth && (
// 						<div>
// 							<IconButton
// 								aria-label="account of current user"
// 								aria-controls="menu-appbar"
// 								aria-haspopup="true"
// 								color="inherit"
// 							>
// 								<AccountCircle />
// 							</IconButton>
// 						</div>
// 					)}
// 				</Toolbar>
// 			</AppBar>
// 		</div>
// 	);
// }
import React  from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { withRouter } from "react-router";

const useStyles = makeStyles({
  root: {
    flexGrow: 1,
  },
});

const Menu = (props) => {
  const classes = useStyles();
  const [value, setValue] = React.useState(findPath());

  function findPath(){
	switch(window.location.pathname) {
		case "/":
		  return 0
		case "/categories":
			return 1
		case "/bookmarks":
			return 2
		default:
		  // code block
	  }
  }

  function handleChange(event, newValue) {
	  setValue(newValue)
	  switch(newValue) {
		case 0:
		  props.history.push("/")
		  break;
		case 1:
			props.history.push("/categories")
		  break;
		case 2:
			props.history.push("/bookmarks")
			break;
		default:
		  // code block
	  }
  }

  return (
    <Paper className={classes.root}>
      <Tabs
        value={value}
        onChange={handleChange}
        indicatorColor="primary"
        textColor="primary"
        centered
      >
        <Tab label="Home" />
        <Tab label="Categories" />
        <Tab label="Bookmarks" />
      </Tabs>
    </Paper>
  );
}
export default withRouter(Menu);