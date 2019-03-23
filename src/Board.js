// Full sudoku board

import React, { Component } from 'react';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import './App.css';

import Section from './Section';

class Board extends Component {
    render() {
        return (
            <div className="row">
                <div className="row">
                    <Section></Section>
                    <Section></Section>
                    <Section></Section>
                </div>
                <div className="row">
                    <Section></Section>
                    <Section></Section>
                    <Section></Section>
                </div>
                <div className="row">
                    <Section></Section>
                    <Section></Section>
                    <Section></Section>
                </div>
            </div>
        );  
    }
}

export default Board;