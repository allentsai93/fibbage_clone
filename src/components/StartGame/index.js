import React, { useState, useEffect } from 'react';
import Game from '../../components/Game';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import { withStyles } from '@material-ui/core/styles';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import '../../App.css';
import categoriesJson from '../../categories.json';
import { withFirebase } from '../../firebase';

const styles = theme => ({
  card: {
    padding: '10px',
    margin: '10px'
  }
});

function StartGame(props) {
  const [categories, setCategories]         = useState([]);
  const [categoryChosen, setCategoryChosen] = useState(false);
  const [loadedQuestion, setLoadedQuestion] = useState({});
  const [players, setData]                  = useState([]);
  const [gameOwner, setGameOwner]           = useState("");

  const gameId  = props.gameId;
  const user    = props.user;
  let userData  = [];
  let gameOwnerUnr = '';

  useEffect(() => {
    setCategories(categoriesJson);
    fetchPlayers();
    fetchGameOwner();
  }, []);

  function fetchPlayers(){
    props.firebase.database().ref('games/' + gameId + '/players').once('value')
      .then((snapshot) => {
          userData = (snapshot.val());
      })
      .then(()=> {
          let players = userData;
          setData(players);
          setTurnOrder(players);
      })
  }

  function fetchGameOwner(){
    props.firebase.database().ref('games/' + gameId + '/gameOwner').once('value')
      .then((snapshot) => {
          gameOwnerUnr = (snapshot.val());
      })
      .then(()=> {
          let gameOwner = gameOwnerUnr;
          setData(gameOwner);
      })
  }

  function choose(choices) {
    var index = Math.floor(Math.random() * choices.length);
    return choices[index];
  }

  async function setTurnOrder(players){
    const data         = {};
    let turnOrder      = [];
    let mutablePlayers = [];

    [data.gameOwner] = await Promise.all([
      fetchGameOwner()
    ])

    console.log(data);
    for(let player in players){
      mutablePlayers.push(player);
    }

    mutablePlayers.forEach(function(player){
      let selection = choose(mutablePlayers);
      turnOrder.push(selection);
      mutablePlayers = mutablePlayers.filter(mutablePlayer => mutablePlayer !== selection);
    })
    // console.log(user);
    // console.log(gameOwner);

    if(user === gameOwner){
      console.log('that worked?')
    }
  }

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
      </> : <Game question={loadedQuestion} user={user} gameId={gameId}/>}
    </Grid>
  );
}

export default withFirebase(withStyles(styles)(StartGame));
