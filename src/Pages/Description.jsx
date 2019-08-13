import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Container } from "@material-ui/core";
import Paper from "@material-ui/core/Paper";
import Typography from "@material-ui/core/Typography";
import Grid from "@material-ui/core/Grid";
import IconButton from "@material-ui/core/IconButton";
import FavoriteIcon from "@material-ui/icons/Favorite";
import { Link } from "react-router-dom";
import Loader from "../common/Loader";
import Fab from '@material-ui/core/Fab';
import Icon from '@material-ui/core/Icon';

const useStyles = makeStyles(theme => ({
  home: {
    fontSize: 24,
    marginTop: 40
  },
  name: {
    fontWeight: "bold"
  },
  media: {
    width: "100%",
    "@media (max-width: 768px)": {
      margin: "20px 0px"
    }
  },
  root: {
    padding: theme.spacing(3, 2)
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  favourite: {
    color: "red"
  },
  publisher: {
    marginTop: 20,
    fontWeight: "bold"
  },
  author: {
    fontStyle: "Italic",
    color: "#3c3c3c9e"
  },
  description: {
    marginTop: 20
  }
}));

const Home = props => {
  let bookmarks = [];
  const classes = useStyles();
  function handleBookmark(value) {
    bookmarks = value;
    props.onBookmark(bookmarks);
  }

  return (
    <div className={classes.home}>
      <Container>
        {props.book && props.book[0].id ? (
          <Paper className={classes.root}>
            <Grid container justify="space-between">
              <Grid item md={8}>
                <Typography
                  className={classes.name}
                  variant="h4"
                  fontWeight="fontWeightBold"
                  component="h2"
                >
                  {props.book[0].volumeInfo.title}
                  <IconButton
                    aria-label="add to favorites"
                    color={
                      props.bookmarks.some(
                        bookmark => bookmark.id === props.book[0].id
                      )
                        ? "secondary"
                        : "default"
                    }
                    onClick={e => handleBookmark(props.book[0])}
                  >
                    <FavoriteIcon />
                  </IconButton>
                </Typography>
                <Typography variant="h5" component="p">
                  {props.book[0].volumeInfo.subtitle}
                </Typography>
                <Typography className={classes.author} component="p">
                  - {props.book[0].volumeInfo.authors[0]}
                </Typography>
                <Typography className={classes.description} component="p">
                  {props.book[0].volumeInfo.description}
                </Typography>
                <Typography className={classes.publisher} component="p">
                  {props.book[0].volumeInfo.publisher}
                </Typography>
                <Typography className={classes.category} component="p">
                  <Link to="/categories">
                    {props.book[0].volumeInfo.categories[0]}
                  </Link>
                </Typography>
              </Grid>

              <Grid item md={3}>
                <img
                  className={classes.media}
                  alt="book-img"
                  src={props.book[0].volumeInfo.imageLinks.thumbnail}
                />
              </Grid>
            </Grid>
			<Fab color="secondary" aria-label="add" className={classes.fab}>
					<Icon>play_arrow</Icon>
				</Fab>
          </Paper>
        ) : (
          <Loader />
        )}
      </Container>
    </div>
  );
};

export default Home;
