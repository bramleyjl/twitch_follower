import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
//Include bootstrap's css 
import './../node_modules/bootstrap/dist/css/bootstrap.min.css';
//Include bootstrap's js
import './../node_modules/bootstrap/dist/js/bootstrap.min.js';
import App from './components/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
