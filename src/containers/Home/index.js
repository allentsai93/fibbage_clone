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

    startGameHandler = (e) => {
        if(this.state.user.length > 0){
            const gameId = uuidv4();
            firebase.database().ref('games/' + gameId).set({
                gameId    : gameId,
                gameOwner : this.state.user,
                players   : {}
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
                {this.state.started ? <WaitingRoom /> : !this.state.optionSelected ? 
                    <>
                    <input type="text" placeholder="Enter a username" onInput={(e) => this.inputHandler(e)}/>
                    <span onClick={this.optionHandler}>Create a Room</span>
                    <span onClick={this.joinRoomHandler}>Join a Room</span>
                    <p>{this.state.errorMsg}</p>
                    </>
                    :
                    this.state.existingRoom ?
                    <>
                        <form onSubmit={this.startGameHandler}>
                        <label>Enter the room code:</label>
                        <input type="text" />
                        </form>
                    </>
                }
            </Grid>
        )
    }
}

export default Home;