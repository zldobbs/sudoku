import React, { Component } from 'react';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import './App.css';

import Board from './Board';

class App extends Component {
  render() {
    return (
      <div className="container center">
        <h1>Sudoku</h1>
        <div className="row">
          <div className="col s12 m6 push-m3">
            <Board></Board>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
