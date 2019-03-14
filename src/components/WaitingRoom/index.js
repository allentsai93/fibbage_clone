import React, { useState, useEffect } from 'react';
import StartGame from '../StartGame';
import { withFirebase } from '../../firebase';

function WaitingRoom(props) {
    const [startGame, setStartGame] = useState(false);
    const [players, setData] = useState([]);

    const user            = props.user;
    const gameId          = props.gameId;
    let userData          = {};
    const fbGameState     = props.firebase.database().ref('games/' + gameId + '/gameState');

    useEffect(() => {
        props.firebase.database().ref('games/' + gameId + '/players').once('value')
        .then((snapshot) => {
            userData = (snapshot.val());
        })
        .then(()=> {
            let players = Object.keys(userData);
            setData(players)
        })

        fbGameState.once('value')
        .then((snapshot) => {
            return snapshot.val();
        })
        .then((data)=> {
            if(data.started) {
                setStartGame(true);
            }
        })
    })

    const startGameHandler = () => {
        fbGameState.update({
            started: true
        })
    }

    return (
        <>
        { !startGame ?
            <>
                <h1>Players</h1>
                <p>Room: {gameId}</p>
                {players.map((player, index) => (
                    <span key={index}>{player}</span>
                ))}
                <button onClick={startGameHandler}>Start Game</button>
            </>
        : <StartGame gameId={gameId} user={user}/>}
        </>
    )
}

export default withFirebase(WaitingRoom);