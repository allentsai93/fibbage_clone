import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Home from './containers/Home';
import * as serviceWorker from './serviceWorker';
import Firebase, { FirebaseContext } from './firebase';

ReactDOM.render(
    <FirebaseContext.Provider value={new Firebase()}>
        <FirebaseContext.Consumer>
            {firebase => <Home firebase={firebase} />}
        </FirebaseContext.Consumer>
    </FirebaseContext.Provider>
, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
