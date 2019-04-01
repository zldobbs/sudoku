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

    /* 
      the algorithm could result in an impossible to fix solution
      if this is the case, just abandon it and rebuild
    */
    while (!this.buildSolution()) {
      console.log('building solution...');
      this.state.soln = [];
      this.state.sects = [];
    }
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

  // asserts that the computed solution is valid 
  assertCorrectSolution() {
    console.log(this.state.soln);
    let s = this.state.soln; 
    let i, j, c = [], r = [];
    // check if columns contain only 1..9 
    for (i = 0; i < 9; i++) {
      c = [];
      r = [];
      for (j = 0; j < 9; j++) {
        if (c.indexOf(s[j][i]) >= 0)
          return false; 
        else 
          c.push(s[j][i]);

        if (r.indexOf(s[i][j]) >= 0)
          return false;
        else
          r.push(s[i][j]);
      }
    }
    return true; 
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
    // console.log(sect);
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
    let i, j, curr, row, col, sects, switched; 
    let placed = false; 
    let used = init.slice(); 
    // fill init with -1's for the rest of the array
    let h = [...Array(6)].map(x => -1);
    init.push(...h);
    for (i = 0; i < 2; i++) {
      row = (Math.floor(q / 3) * 3) + i + 1; 
      for (j = 0; j < 3; j++) {
        placed = false; 
        while (init[((i+1)*3) + j] === -1 && !placed && used.length < 9) {
          // pick a random number not yet used in this section 
          curr = Math.floor(Math.random() * 9) + 1; 
          while (used.indexOf(curr) >= 0) curr = Math.floor(Math.random() * 9) + 1; 
          col = ((q % 3) * 3) + j; 
          if (this.checkRow(row, curr) && this.checkColumn(col, curr)) {
            init[((i+1)*3) + j] = curr;
            placed = true; 
          }
          else {
            // need to move it around
            switched = this.switchInSection(init, curr, q, i+1, j);
            if (switched === -1) {
              return false; 
            } 
            else if (switched === 1) {
              placed = true; 
            }
          }
          used.push(curr);
        }
      }
    }
    this.fillSection(init, q); 
    sects = this.state.sects; 
    sects.push(init);
    this.state.sects = sects;
    return true; 
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
      if (!this.buildSection(initialSect, i)) {
        return false; 
      }
    }
    // the solution should be finished, but just for safety assert its correct 
    return this.assertCorrectSolution(); 
    // console.log(this.state.soln);
  }

  /*
    finds a new place for e in the section 
    sect  : the section that is being modified
    e     : the value that needs a location 
    q     : the quadrant the section is contained in 
    r, c  : row and column offset of where e is trying to be placed 
  */
  switchInSection(sect, e, q, r, c) {
    // console.log('sect: ' + sect);
    let i, j, row, col, t; 
    for (i = 0; i < 3; i++) {
      for (j = 0; j < 3; j++) {
        // see if e will fit here 
        row = (Math.floor(q / 3) * 3) + i; 
        col = ((q % 3) * 3) + j; 
        if (this.checkRow(row, e) && this.checkColumn(col, e)) {
          if (sect[(i*3)+j] === -1) {
            sect[(i*3)+j] = e; 
            return 0; 
          }
          else {
            // if something is already here, we should try to swap the elements
            row = (Math.floor(q / 3) * 3) + r; 
            col = ((q % 3) * 3) + c; 
            if (this.checkRow(row, sect[(i*3)+j]) && this.checkColumn(col, sect[(i*3)+j])) {
              // make the swap 
              t = sect[(i*3)+j];
              sect[(i*3)+j] = e;
              sect[(r*3)+c] = t; 
              return 1; 
            }
          }
        }
      }
    }
    return -1;  
  }

  // check if this element is contatined in the column 
  checkColumn(col, k) {
    let s = this.state.soln.slice(); 
    let c = [];
    for (var i = 0; i < 9; i++) {
      c.push(s[i][col]);
    }
    return c.indexOf(k) < 0 ? true : false; 
  }

  // check is this element is contained in the row 
  checkRow(row, k) {
    let s = this.state.soln[row];
    return s.indexOf(k) < 0 ? true : false; 
  }

  /* 
    generates 3 row solutions 
    these will be stored in rows 1, 4, and 7

    FIXME error with first column leaving duplicates 
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
