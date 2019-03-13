import React, { useState, useEffect } from 'react';
import StartGame from '../StartGame';
import { firebase } from '../../firebase.js';

function WaitingRoom(props) {
    const [startGame, setStartGame] = useState(false);
    const [players, setData] = useState([]);

    const gameId = props.gameId;
    let userData  = {};

    useEffect(() => {
        firebase.database().ref('games/' + gameId + '/players').once('value')
        .then((snapshot) => {
            userData = (snapshot.val());
        })
        .then(()=> {
            let players = Object.keys(userData);
            setData(players)
        })
    }, [])

    return (
        <>
        { !startGame ?
            <>
                <h1>Players</h1>
                {players}
                <button onClick={() => setStartGame(true)}>Start Game</button>
            </>
        : <StartGame />}
        </>
    )
}

export default WaitingRoom;