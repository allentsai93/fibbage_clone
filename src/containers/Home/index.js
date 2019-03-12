import React, { Component } from 'react';
import WaitingRoom from '../../components/WaitingRoom';
import Grid from '@material-ui/core/Grid';
import { uuidv1, uuidv4, firebase } from '../../firebase.js';

class Home extends Component {
    state = {
        gameId: '',
        user: '',
        existingRoom: false,
        started: false,
        errorMsg: ''
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
        const gameId = this.state.gameId;
        const user = this.state.user;
        firebase.database().ref('games/' + gameId + '/' + user).set({
            points : 0,
            id     : uuidv1()
        })
        this.setState({
            started: true
        })
    }

    startGameHandler = () => {
        if(this.state.user.length > 0){
            const gameId = uuidv4();
            const gameOwner = this.state.user
            firebase.database().ref('games/' + gameId).set({
                gameOwner : gameOwner
            });
            firebase.database().ref('games/' + gameId + '/' + gameOwner).set({
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
                    <input type="text" placeholder="Enter a username" onInput={this.inputHandler}/>
                    <span onClick={this.startGameHandler}>Create a Room</span>
                    <span onClick={this.joinGameHandler}>Join a Room</span>
                    <p>{this.state.errorMsg}</p>
                    </>
                    :
                    <>
                        <input type="text" placeholder="Enter a game id" onInput={this.gameIdInputHandler}/>
                        <button onClick={this.joinRoom}>Join Room</button>
                    </>
                }
            </Grid>
        )
    }
}

export default Home;