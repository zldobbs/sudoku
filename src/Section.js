// Section of 9 tiles 

import React, { Component } from 'react';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import './App.css';

import Tile from './Tile'; 

class Section extends Component {
    render() {
        return (
            <div className="section col s4">
                <div className="row">
                    <Tile></Tile>
                    <Tile></Tile>
                    <Tile></Tile>
                </div>
                <div className="row">
                    <Tile></Tile>
                    <Tile></Tile>
                    <Tile></Tile>
                </div>
                <div className="row">
                    <Tile></Tile>
                    <Tile></Tile>
                    <Tile></Tile>
                </div>
            </div>
        );
    }
}

export default Section; 