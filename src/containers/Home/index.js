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
        started: false,
        optionSelected: false,
        existingRoom: false
    }

    optionHandler = () => {
        this.setState({optionSelected: true})
    }

    joinRoomHandler = () => {
        this.setState({optionSelected: true, existingRoom: true})
    }

    startGameHandler = () => {
        this.setState({started: true})
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
                    <span onClick={this.optionHandler}>Create a Room</span>
                    <span onClick={this.joinRoomHandler}>Join a Room</span>
                    </>
                    :
                    this.state.existingRoom ?
                    <>
                        <form onSubmit={this.startGameHandler}>
                        <label>Enter the room code:</label>
                        <input type="text" />
                        </form>
                    </>
                    :
                    <>
                        <form onSubmit={this.startGameHandler}>
                        <label>Enter a cool name:</label>
                        <input type="text" />
                        </form>
                    </>
                }
            </Grid>
        )
    }
}

export default Home;