// Section of 9 tiles 

import React, { Component } from 'react';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import './App.css';

import Tile from './Tile'; 

class Section extends Component {
    render() {
        // let section = this.createSection();
        return (
            <div className="section col s4">
                <div className="row">
                    <Tile val={this.props.section[0]}></Tile>
                    <Tile val={this.props.section[1]}></Tile>
                    <Tile val={this.props.section[2]}></Tile>
                </div>
                <div className="row">
                    <Tile val={this.props.section[3]}></Tile>
                    <Tile val={this.props.section[4]}></Tile>
                    <Tile val={this.props.section[5]}></Tile>
                </div>
                <div className="row">
                    <Tile val={this.props.section[6]}></Tile>
                    <Tile val={this.props.section[7]}></Tile>
                    <Tile val={this.props.section[8]}></Tile>
                </div>
            </div>
        );
    }
}

export default Section; 