import React, { Component } from 'react';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import './App.css';

import Board from './Board';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      soln: [Array(9)],
      sects: []
    }

    this.buildSolution();
  }

  // shuffles the elements of the given array
  shuffle(array) {
    let result = array; 
    let index = array.length;
    let temp, randomIndex;
    while (index !== 0) {
      randomIndex = Math.floor(Math.random() * index);
      index -= 1; 
      
      temp = result[index];
      result[index] = result[randomIndex];
      result[randomIndex] = temp;
    }
    return result; 
  }

  /*
    puts the section into the solution
    sect  : section to fill
    q     : quadrant in which the section will be placed
            0 1 2
            3 4 5
            6 7 8
  */
  fillSection(sect, q) {
    console.log(sect);
    let s = this.state.soln; 
    let row = Math.floor(q / 3) * 3; 
    let col = (q % 3) * 3; 
    let p = [], t = []; 
    for (var i = 0; i < 3; i++) {
      p = s[row+i].slice();
      t = sect.slice((i*3), (i*3)+3);
      p.splice(col, 3, t[0], t[1], t[2]);
      s[row+i] = p.slice(); 
    }
    this.state.soln = s.slice(); 
  }

  /*
    builds a 3x3 section that will fit within the solution 
    init  : top row of the section
    q     : quadrant of the section:
          0 1 2
          3 4 5
          6 7 8
  */
  buildSection(init, q) {
    // fill two rows make sure they fit the solution and section
    let i, j, curr, row, col; 
    let used = init.slice(); 
    for (i = 0; i < 2; i++) {
      row = (Math.floor(q / 3) * 3) + i + 1; 
      for (j = 0; j < 3; j++) {
        // pick a random number not yet used in this section 
        curr = Math.floor(Math.random() * 9) + 1; 
        while (used.indexOf(curr) >= 0) curr = Math.floor(Math.random() * 9) + 1; 
        col = ((q % 3) * 3) + j; 
        if (this.checkRow(row, curr) && this.checkColumn(col, curr)) {
          init.push(curr);
        }
        else {
          // need to move it around
          // this.switchSection(); 
          init.push(-1);
        }
        used.push(curr);
      }
    }
    this.fillSection(init, q); 
    let sects; 
    sects = this.state.sects; 
    sects.push(init);
    this.state.sects = sects;
  }

  // build the entire sudoku solution 
  buildSolution() {
    let init = this.firstThree();
    var soln = [Array(9)];
    let z = [...Array(9)].map(x => 0);
    soln[0] = init[0].slice();
    soln[3] = init[1].slice();
    soln[6] = init[2].slice();
    soln[1] = soln[2] = soln[4] = soln[5] = soln[7] = soln[8] = z.slice();
    this.state.soln = soln;

    let i, j, k, initialSect; 
    for (i = 0; i < 9; i++) {
      j = Math.floor(i / 3); 
      k = (i % 3) * 3; 
      initialSect = init[j].slice(k, k+3); 
      // console.log(initialSect);
      this.buildSection(initialSect, i);
    }
    // console.log(this.state.soln);
  }

  switchInSection() {
    // TODO 
  }


  checkColumn(col, k) {
    let s = this.state.soln.slice(); 
    let c = [];
    for (var i = 0; i < 9; i++) {
      c.push(s[i][col]);
    }
    return c.indexOf(k) < 0 ? true : false; 
  }

  checkRow(row, k) {
    let s = this.state.soln[row];
    return s.indexOf(k) < 0 ? true : false; 
  }

  /* 
    generates 3 row solutions 
    these will be stored in rows 1, 4, and 7
  */
  firstThree() {
    let soln = [];
    var i, j, t; 

    // defines an array [1..9], this will be used to populate the array quicker
    let base = [...Array(9).keys()].map(x => ++x);
    for (i = 0; i < 3; i++) 
      soln.push(this.shuffle(base.slice()));

    // fix the issues now, no columns should overlap 
    for (i = 0; i < 9; i++) {
      if (soln[0][i] === soln[1][i]) {
        j = 0;
        while (j < 9 && 
              soln[0][i] === soln[1][j] && 
              soln[0][j] === soln[1][i]) 
          j++;
        if (j >= 9) {
          console.log('error');
        }
        else {
          t = soln[1][j];
          soln[1][j] = soln[1][i];
          soln[1][i] = t;
        }
      }
    }

    // fix last row
    for (i = 0; i < 9; i++) {
      if (soln[0][i] === soln[2][i] || soln[1][i] === soln[2][i]) {
        j = 0; 
        while (j < 9 && 
              ((soln[0][i] === soln[2][j] && soln[0][j] === soln[2][i]) ||
              (soln[1][i] === soln[2][j] && soln[1][j] === soln[2][i])))
          j++;
        if (j >= 9) {
          console.log('error');
        }
        else {
          t = soln[2][j];
          soln[2][j] = soln[2][i];
          soln[2][i] = t;
        }
      }
    }

    console.log(soln);
    return soln;
  }

  render() {
    return (
      <div className="container center">
        <h1>Sudoku</h1>
        <div className="row">
          <div className="col s12 m6 push-m3">
            <Board sections={this.state.sects}></Board>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
