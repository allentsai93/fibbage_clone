import React, { Component } from 'react';
import StartGame from '../StartGame';

class WaitingRoom extends Component {
    state = {
        startGame: false
    }

    componentDidMount = () => {
        console.log(this.state.gameId)
    }

    startGameHandler = () => {
        this.setState({startGame: true})
    }



    render() {
        return (
            <>
            { !this.state.startGame ?
                <>
                    <h1>Players</h1>
                    <span>Test 1</span>
                    <span>Test 2</span>
                    <span>Test 3</span>
                    <span>Test 4</span>
                    <button onClick={this.startGameHandler}>Start Game</button>
                </>
            : <StartGame />}
            </>
        )
    }
} 

export default WaitingRoom;