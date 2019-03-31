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
                    <Section section={this.props.sections[0]}></Section>
                    <Section section={this.props.sections[1]}></Section>
                    <Section section={this.props.sections[2]}></Section>
                </div>
                <div className="row">
                    <Section section={this.props.sections[3]}></Section>
                    <Section section={this.props.sections[4]}></Section>
                    <Section section={this.props.sections[5]}></Section>
                </div>
                <div className="row">
                    <Section section={this.props.sections[6]}></Section>
                    <Section section={this.props.sections[7]}></Section>
                    <Section section={this.props.sections[8]}></Section>
                </div>
            </div>
        );  
    }
}

export default Board;