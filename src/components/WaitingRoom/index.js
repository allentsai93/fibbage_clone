import React, { useState, useEffect } from 'react';
import StartGame from '../StartGame';
import { withFirebase } from '../../firebase';

function WaitingRoom(props) {
    const [startGame, setStartGame] = useState(false);
    const [players, setData] = useState([]);

    const gameId = props.gameId;
    let userData  = {};

    useEffect(() => {
        props.firebase.database().ref('games/' + gameId + '/players').once('value')
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
                {players.map(player => (
                    <span>{player}</span>
                ))}
                <button onClick={() => setStartGame(true)}>Start Game</button>
            </>
        : <StartGame />}
        </>
    )
}

export default withFirebase(WaitingRoom);