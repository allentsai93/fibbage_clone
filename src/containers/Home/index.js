import React, { Component } from 'react';
import WaitingRoom from '../../containers/WaitingRoom';
import Grid from '@material-ui/core/Grid';
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

class Home extends Component {
    state = {
        gameId: '',
        user: '',
        existingRoom: false,
        errorMsg: ''
    }

    inputHandler = (e) =>{
        const name = e.target.value;
        this.setState({ user: name });
    }

    gameIdInputHandler = (e) =>{
        const gameId        = e.target.value;
        const currentUser   = this.state.user;
        firebase.database().ref('games/' + gameId).set({
            players : {currentUser}
        })

    }

    startGameHandler = () => {
        if(this.state.user.length > 0){
            const gameId = uuidv4();
            const gameOwner = this.state.user
            firebase.database().ref('games/' + gameId).set({
                gameId    : gameId,
                gameOwner : gameOwner,
                players   : {gameOwner}
            });
            this.setState({
                gameId: gameId
            })
        } else {
            this.setState({ errorMsg: "Must enter a username to create game"})
        }
    }

    joinGameHandler = (e) =>{
        if(this.state.user.length > 0){
            this.setState({ existingRoom: true });
        } else {
            this.setState({ errorMsg: "Must enter a username to join game"})
        }
    }

    render() {
        return (
            <Grid
            container
            direction="column"
            justify="center"
            alignItems="center"
          >
                {this.state.started ? <WaitingRoom /> : !this.state.existingRoom ? 
                    <>
                    <input type="text" placeholder="Enter a username" onInput={(e) => this.inputHandler(e)}/>
                    <span onClick={this.startGameHandler}>Create a Room</span>
                    <span onClick={this.joinGameHandler}>Join a Room</span>
                    <p>{this.state.errorMsg}</p>
                    </>
                    :
                    <>
                        <input type="text" placeholder="Enter a game id"/>
                    </>
                }
            </Grid>
        )
    }
}

export default Home;