// Tile component

import React, { Component } from 'react';
import '../node_modules/materialize-css/dist/css/materialize.min.css';
import './App.css';

class Tile extends Component {
    render() {
        return (
            <div className="tile col s4">
                <span>{this.props.val > -1 ? this.props.val : ''}</span>
            </div>
        );
    }
}

export default Tile;