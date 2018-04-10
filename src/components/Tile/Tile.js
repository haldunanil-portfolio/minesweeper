import React, { Component } from "react";
import "./Tile.css";

class Tile extends Component {
  constructor(props) {
    super(props);
    this.handleFlipTile = this.handleFlipTile.bind(this);
  }

  handleFlipTile() {
    this.props.playMove(this.props.rowIndex, this.props.colIndex);
  }

  render() {
    const addClass = this.props.playerBoardElement;
    return (
      <div className={"Tile Tile-" + addClass} onClick={this.handleFlipTile}>
        <div className="Tile-content">{this.props.playerBoardElement}</div>
      </div>
    );
  }
}

export default Tile;
