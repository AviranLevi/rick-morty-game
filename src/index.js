import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'mobx-react'
import LaserShot from './stores/LaserShot'
import SpaceShip from './stores/SpaceShip'
import GameManager from './stores/GameManager'


const stores = { GameManager, SpaceShip, LaserShot }
ReactDOM.render(<Provider {...stores}>
    <App />
</Provider>, document.getElementById('root'));

serviceWorker.unregister();
