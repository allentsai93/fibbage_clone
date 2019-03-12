import React from 'react';

const Gameroom = (props) => (
    <div>
      <h1>Fibbage</h1>
        <input placeholder="Enter a username"></input>
        <button onClick={(userId, name) => props.createGame(userId, name)}>New Game</button>
        <button onClick={(gameId) => props.joinGame(gameId)}>Join Game</button>
    </div>
);

export default Gameroom;