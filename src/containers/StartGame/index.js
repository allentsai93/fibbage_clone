import React, { Component } from 'react';
import Game from '../Game';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import '../../App.css';

const styles = theme => ({
  card: {
    padding: '10px',
    margin: '10px'
  }
});
class StartGame extends Component {
  state = {
    isLoaded: false,
    categoryChosen: false,
    loadedQuestion: {},
    categories: [
      {value:"9",
      title:"General Knowledge"},
      {value:"10",
      title:"Books"},
      {value:"11",
      title:"Film"},
      {value:"12",
      title:"Music"},
      {value:"13",
      title:"Musicals & Theatres"},
      {value:"14",
      title:"Television"},
      {value:"15",
      title:"Video Games"},
      {value:"16",
      title:"Board Games"},
      {value:"17",
      title:"Science & Nature"},
      {value:"18",
      title:"Computers"},
      {value:"19",
      title:"Mathematics"},
      {value:"20",
      title:"Mythology"},
      {value:"21",
      title:"Sports"},
      {value:"22",
      title:"Geography"},
      {value:"23",
      title:"History"},
      {value:"24",
      title:"Politics"},
      {value:"25",
      title:"Art"},
      {value:"26",
      title:"Celebrities"},
      {value:"27",
      title:"Animals"},
      {value:"28",
      title:"Vehicles"},
      {value:"29",
      title:"Comics"},
      {value:"30",
      title:"Gadgets"},
      {value:"31",
      title:"Japanese Anime & Manga"},
      {value:"32",
      title:"Cartoon & Animations"}
    ]
  }
  changeHandler = (e) => {
    this.fetchQuestions(e);
  }
  fetchQuestions = async (category) => {
    return fetch(`https://opentdb.com/api.php?amount=1&category=${category}&type=multiple`)
            .then(res => res.json())
              .then(data => this.setState({loadedQuestion: data, categoryChosen: true}))
  }
  render() {
    const { classes }  = this.props;

    const categories = this.state.categories.map((cat, i) => (
      <Card className={classes.card} key={i} value={cat.value} onClick={() => { this.changeHandler(cat.value)}}>
          <CardContent>
            <Typography>{cat.title}</Typography>
          </CardContent>
      </Card>
    ));

    return (
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
        {!this.state.categoryChosen ? 
        <>
        <h1>Choose a Category</h1>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
        >
        {categories}
        </Grid> 
        </> : <Game question={this.state.loadedQuestion}/>}
      </Grid>
    );
  }
}

export default withStyles(styles)(StartGame);
