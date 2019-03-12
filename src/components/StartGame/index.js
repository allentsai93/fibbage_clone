import React, { useState, useEffect } from 'react';
import Game from '../../components/Game';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import '../../App.css';
import categoriesJson from '../../categories.json';

const styles = theme => ({
  card: {
    padding: '10px',
    margin: '10px'
  }
});

function StartGame(props) {
  const [categories, setCategories] = useState([]);
  const [categoryChosen, setCategoryChosen] = useState(false);
  const [loadedQuestion, setLoadedQuestion] = useState({});

  useEffect(() => {
    setCategories(categoriesJson);
  }, []);

  function fetchQuestions(category)  {
    return fetch(`https://opentdb.com/api.php?amount=1&category=${category}&type=multiple`)
            .then(res => res.json())
              .then(data => {
                setLoadedQuestion(data);
                setCategoryChosen(true);
              })
  }

  const { classes }  = props;
  
  return (
      <Grid
        container
        direction="column"
        justify="center"
        alignItems="center"
      >
      {!categoryChosen ? 
      <>
      <h1>Choose a Category</h1>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
      >
      { categories.map((cat, i) => (
        <Card className={classes.card} key={i} value={cat.value} onClick={() => {  fetchQuestions(cat.value) }}>
            <CardContent>
              <Typography>{cat.title}</Typography>
            </CardContent>
      </Card>)) }
      </Grid> 
      </> : <Game question={loadedQuestion}/>}
    </Grid>
  );
}

export default withStyles(styles)(StartGame);
