import React, { Component } from 'react';
import WaitingRoom from '../../components/WaitingRoom';
import Grid from '@material-ui/core/Grid';
import { withFirebase } from '../../firebase';
import shortid from 'shortid';
import uuidv1 from 'uuid/v1';

class Home extends Component {
    state = {
        gameId: '',
        user: '',
        existingRoom: false,
        started: false,
        errorMsg: ''
    }

    inputHandler = (e) =>{
        const errorMsg = e.target.name === 'gameId' ? "Must enter a game id to join a game" : 'Must enter a username to join game';

        if(e.target.value.length > 0){
            this.setState({ [e.target.name]: e.target.value });
        } else {
            this.setState({ errorMsg: errorMsg})
        } 
    }

    joinRoom = () => {
        const gameId    = this.state.gameId;
        const user      = this.state.user;
        const gameData  = this.props.firebase.database().ref('games/');

        gameData.once("value")
            .then((snapshot) => {
                if(!snapshot.hasChild(gameId)){
                    return Promise.reject();
                } else {
                    const userData  = this.props.firebase.database().ref('games/' + gameId + '/players/');
                    let nameTaken   = false;
                    userData.once("value")
                        .then((snapshot) => {
                            if(snapshot.hasChild(user)){
                               return Promise.reject();
                            } else {
                                this.props.firebase.database().ref('games/' + gameId + '/players/' + user).set({
                                    points : 0,
                                    id     : uuidv1()
                                })
                            }
                        })
                        .then(() => this.setState({started: true, existingRoom: true}))
                        .catch(() =>  this.setState({ errorMsg: "Please enter another username." }))
                }
            }).catch(() =>  this.setState({ errorMsg: "Game does not exist." }))
    }

    startGameHandler = () => {
        if(this.state.user.length > 0){
            const gameId    = shortid.generate();
            const gameOwner = this.state.user
            this.props.firebase.database().ref('games/' + gameId).set({
                gameOwner : gameOwner,
                gameState : { started: false }
            });
            this.props.firebase.database().ref('games/' + gameId + '/players/' + gameOwner).set({
                points    : 0,
                id        : uuidv1()
            });
            this.setState({
                gameId    : gameId,
                started   : true
            })
        } else {
            this.setState({ errorMsg: "Must enter a username to create game."})
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
                {this.state.started ? <WaitingRoom gameId={this.state.gameId} user={this.state.user} /> : 
                    <>
                    <input type="text" placeholder="Enter a username" name="user" onInput={this.inputHandler}/>
                    <button onClick={this.startGameHandler}>Create a Room</button>
                    <input type="text" placeholder="Enter a game id" name="gameId" onInput={this.inputHandler}/>
                    <button onClick={this.joinRoom}>Join Room</button>
                    <p>{this.state.errorMsg}</p>
                    </>
                }
            </Grid>
        )
    }
}

export default withFirebase(Home);