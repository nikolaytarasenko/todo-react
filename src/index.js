import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import ToDo from './ToDo';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(<ToDo />, document.getElementById('app'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
