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
        indicatorColor="secondary"
        textColor="inherit"
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