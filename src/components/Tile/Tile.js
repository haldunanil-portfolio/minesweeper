import React, { Component } from "react";
import "./Tile.css";
import explodedBomb from "./exploded-bomb.png";
import safeBomb from "./safe-bomb.png";

class Tile extends Component {
  constructor(props) {
    super(props);
    this.handleFlipTile = this.handleFlipTile.bind(this);
  }

  handleFlipTile() {
    this.props.playMove(this.props.rowIndex, this.props.colIndex);
  }

  render() {
    const addClass =
      this.props.playerBoardElement === "B"
        ? this.props.playerBoardElement + "-" + this.props.didWin
        : this.props.playerBoardElement;
    return (
      <div className={"Tile Tile-" + addClass} onClick={this.handleFlipTile}>
        <div className="Tile-content">
          {this.props.playerBoardElement === "B" ? (
            <img
              className="Tile-bomb-img"
              src={this.props.didWin ? safeBomb : explodedBomb}
              alt="bomb"
            />
          ) : (
            this.props.playerBoardElement
          )}
        </div>
      </div>
    );
  }
}

export default Tile;
