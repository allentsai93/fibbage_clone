import React from 'react';

const Gameroom = (props) => (
    <div>
      <h1>Fibbage</h1>
        <input onInput={(e) => props.onNameEntry(e)} placeholder="Enter a username"></input>
        <p>{props.errorMessage}</p>
        <button onClick={(userId) => props.createGame(userId)}>New Game</button>
        <input onInput={(e) => props.onGameEntry(e)} placeholder="Enter a game id"></input>
        <button onClick={(gameId) => props.joinGame(gameId)}>Join Game</button>
    </div>
);

export default Gameroom;