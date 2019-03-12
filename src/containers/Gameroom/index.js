import React from 'react';

const Gameroom = (props) => (
    <div>
        <button onClick={(userId) => createGame(userId)}>New Game</button>
        <button onClick={(gameId) => joinGame(gameId)}>Join Game</button>
    </div>
);

export default Gameroom;