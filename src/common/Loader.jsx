import React from "react";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    display: "block",
    margin: "auto",
    "@media (max-width: 768px)": {
      width: "100%"
    }
  },
  progress: {
    margin: theme.spacing(2)
  }
}));

export default function CircularIndeterminate() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <img
        className={classes.root}
        src={require("../assets/book.gif")}
        alt="books-loader"
      />
    </div>
  );
}
