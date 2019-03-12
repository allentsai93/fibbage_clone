import React, { Component } from 'react';
import WaitingRoom from '../../components/WaitingRoom';
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
        started: false,
        errorMsg: '',
        joinGameErrorMsg: ''
    }
    
    startGameHandler = () => {
        this.setState({started: true})
    }

    inputHandler = (e) =>{
        const name = e.target.value;
        this.setState({ user: name });
    }

    gameIdInputHandler = (e) =>{
        const gameId = e.target.value;
        this.setState({ 
            gameId  : gameId
        });
    }

    joinRoom = () => {
        const gameId    = this.state.gameId;
        const user      = this.state.user;
        const gameData  = firebase.database().ref('games/');

        gameData.once("value")
            .then(function(snapshot){
                if(!snapshot.hasChild(gameId)){
                    return Promise.reject();
                } else {
                    const userData  = firebase.database().ref('games/' + gameId + '/players/');
                    let nameTaken   = false;
                    userData.once("value")
                        .then(function(snapshot){
                            if(snapshot.hasChild(user)){
                                console.log('hit')
                               return Promise.reject();
                            } else {
                                firebase.database().ref('games/' + gameId + '/players/' + user).set({
                                    points : 0,
                                    id     : uuidv1()
                                })
                            }
                        }).then(() => this.setState({started: true})).catch(() =>  this.setState({ joinGameErrorMsg: "Username already taken" }))
                }
            }).catch(() =>  this.setState({ joinGameErrorMsg: "Game does not exist" }))
    }

    startGameHandler = () => {
        if(this.state.user.length > 0){
            const gameId    = uuidv4();
            const gameOwner = this.state.user
            firebase.database().ref('games/' + gameId).set({
                gameOwner : gameOwner
            });
            firebase.database().ref('games/' + gameId + '/players/' + gameOwner).set({
                points    : 0,
                id        : uuidv1()
            });
            this.setState({
                gameId    : gameId,
                started   : true
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
                        <input type="text" placeholder="Enter a game id" onInput={(e) => this.gameIdInputHandler(e)}/>
                        <button onClick={() => this.joinRoom()}>Join Room</button>
                        {this.state.joinGameErrorMsg.length === 'Username already taken' ? 
                            <>
                                <p>{[this.state.joinGameErrorMsg]}</p>
                                <input type="text" placeholder="Enter a username" onInput={(e) => this.inputHandler(e)}/>
                            </>
                            :
                            <p>{[this.state.joinGameErrorMsg]}</p>
                        }
                    </>
                }
            </Grid>
        )
    }
}

export default Home;