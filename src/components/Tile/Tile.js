import React, { Component } from "react";
import "./Tile.css";
import explodedBomb from "./exploded-bomb.png";
import safeBomb from "./safe-bomb.png";
import flag from "./flag.png";
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

class Tile extends Component {
  constructor(props) {
    super(props);
    this.handleFlipTile = this.handleFlipTile.bind(this);
    this.plantFlag = this.plantFlag.bind(this);
    this.removeFlag = this.removeFlag.bind(this);
  }

  handleFlipTile() {
    this.props.updateTile(this.props.rowIndex, this.props.colIndex, 'flagged', false);
    this.props.updateTile(this.props.rowIndex, this.props.colIndex, 'revealed', true);
    this.props.playMove(this.props.rowIndex, this.props.colIndex);
  }

  plantFlag() {
    if (!this.props.tileState.revealed) {
      this.props.updateTile(this.props.rowIndex, this.props.colIndex, 'flagged', true);
    }
  }

  removeFlag() {
    if (!this.props.tileState.revealed) {
      this.props.updateTile(this.props.rowIndex, this.props.colIndex, 'flagged', false);
    }
  }

  render() {
    const addClass =
      this.props.playerBoardElement === "B"
        ? this.props.playerBoardElement + "-" + this.props.didWin
        : this.props.playerBoardElement;

    let tileContent;
    if (this.props.didWin === true && this.props.playerBoardElement === "B") {
      // if user won, display safe bomb
      tileContent = (
        <img className="Tile-bomb-img" src={safeBomb} alt="safeBomb" />
      );
    } else if (this.props.didWin === false && this.props.playerBoardElement === "B") {
      // if user lost, display exploded bomb
      tileContent = (
        <img className="Tile-bomb-img" src={explodedBomb} alt="explodedBomb" />
      );
    } else if (this.props.tileState.flagged === true) {
      // if the spot is flagged, display the flag
      tileContent = <img className="Tile-bomb-img" src={flag} alt="flag" />;
    } else {
      // otherwise, display the number value
      tileContent = this.props.playerBoardElement;
    }

    return (
      <div>
        <ContextMenuTrigger
          id={`cmt-${this.props.rowIndex}-${this.props.colIndex}`}
        >
          <div
            className={"Tile Tile-" + addClass}
            onClick={this.props.tileState.flagged ? console.log("You already flagged this gurl.") : this.handleFlipTile }
          >
            <div className="Tile-content">{tileContent}</div>
          </div>
        </ContextMenuTrigger>
        <ContextMenu id={`cmt-${this.props.rowIndex}-${this.props.colIndex}`}>
          <MenuItem onClick={this.plantFlag} disabled={this.props.tileState.flagged || this.props.tileState.revealed}>
            Plant flag
          </MenuItem>
          <MenuItem divider />
          <MenuItem onClick={this.removeFlag} disabled={!this.props.tileState.flagged || this.props.tileState.revealed}>
            Remove flag
          </MenuItem>
        </ContextMenu>
      </div>
    );
  }
}

export default Tile;
