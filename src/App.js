import React, { Component } from 'react';
import Game from './containers/Game';
import Gameroom from './containers/Gameroom';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import './App.css';
const firebase = require("firebase/app");
require("firebase/database");
const config = {
  apiKey: "AIzaSyAsdY2YHQDAVJ9ZJgsqNVB2kaB3A5jVmNY",
  authDomain: "fibbage-b1e4d.firebaseapp.com",
  databaseURL: "https://fibbage-b1e4d.firebaseio.com",
  projectId: "fibbage-b1e4d",
  storageBucket: "fibbage-b1e4d.appspot.com",
};
firebase.initializeApp(config);
const uuidv1 = require('uuid/v1');
const uuidv4 = require('uuid/v4');

const styles = theme => ({
  card: {
    padding: '10px',
    margin: '10px'
  }
});
class App extends Component {
    state = {
      gameRoom: '',
      userId: '',
      name: '',
      isLoaded: false,
      categoryChosen: false,
      players: [],
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
  createGame = (userId) => {
    if(this.state.name.length > 0){
      let userId = '';
      if(this.state.userId === ''){
        userId = uuidv1();
      }
      const gameId = uuidv4();
      firebase.database().ref('games/' + gameId).set({
        gameOwner : userId,
        gameId    : gameId,
        players   : {}
      });
      firebase.database().ref('users/' + userId).set({
        userId    : userId,
        name      : this.state.name
      });
      this.setState({
        gameRoom  : gameId,
        gameOwner : this.state.name,
        players   : [this.state.name]
      });
    } else {
      this.setState({ errorMessage: 'Player must enter a name before joining or starting a game' })
    }
  }
  joinGame = (gameId, name) => {
    if(this.state.gameToJoin.length > 0 && this.state.name.length > 0){
      let userId = '';
      if(this.state.userId === ''){
        userId = uuidv1();
      }

    } else {
      this.setState({ errorMessage: 'Player must enter a name & game before joining or starting a game' })
    }
  }
  onNameEntry = (e) => {
    let name = e.target.value;
    this.setState({ name: name })
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
      <>
      {this.state.gameRoom === '' ?
      <Gameroom
      createGame={this.createGame}
      joinGame={this.joinGame}
      onNameEntry={this.onNameEntry}
      errorMessage={this.state.errorMessage}
      />
        :
        <Grid
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
        {!this.state.categoryChosen ?
          <>
          <p>Your Game Room: {this.state.gameRoom}</p>
          <p>Players: {this.state.players}</p>
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
      }
    </>
    );
  }
}

export default withStyles(styles)(App);
