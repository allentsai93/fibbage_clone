import React, { useState } from 'react';
import StartGame from '../StartGame';
import { firebase } from '../../firebase.js';

function WaitingRoom(props) {
    const [startGame, setStartGame] = useState(false);
    const [players]

    const gameId = props.gameId;
    let userData  = {};
    firebase.database().ref('games/' + gameId + '/players').once('value')
        .then((snapshot) => {
            userData = (snapshot.val());
        })
        .then(()=> {
            let players = Object.keys(userData);
            console.log(players);
        })

    return (
        <>
        { !startGame ?
            <>
                <h1>Players</h1>
                <span>Test 1</span>
                <span>Test 2</span>
                <span>Test 3</span>
                <span>Test 4</span>
                <button onClick={() => setStartGame(true)}>Start Game</button>
            </>
        : <StartGame />}
        </>
    )
} 

export default WaitingRoom;