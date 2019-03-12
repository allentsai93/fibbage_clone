import React, { useState } from 'react';
import StartGame from '../../containers/StartGame';

function WaitingRoom() {
    const [startGame, setStartGame] = useState(false);

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