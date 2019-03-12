import React, { Component } from 'react';
import WaitingRoom from '../../containers/WaitingRoom';
import Grid from '@material-ui/core/Grid';

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
        this.setState({optionSelected: true, existingRoom: true, started: true})
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
                        <form onSubmit={this.joinRoomHandler}>
                        <label>Enter the room code:</label>
                        <input type="text" />
                        <label>Enter a cool name:</label>
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