import React, { Component } from "react";
import "./App.css";

import Setup from "../Setup/Setup";
import GameGrid from "../GameGrid/GameGrid";
import { Board } from "../Board/Board";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      sideLength: null,
      board: null,
      isPlaying: null,
      isWon: null
    };
    this.handleSideLengthChange = this.handleSideLengthChange.bind(this);
    this.handleFlipTile = this.handleFlipTile.bind(this);
    this.playMove = this.playMove.bind(this);
  }

  handleSideLengthChange(value) {
    this.setState({
      sideLength: value,
      board: new Board(value, value, value),
      isPlaying: true
    });
  }

  handleFlipTile(rowIndex, colIndex) {
    let newBoard = this.state.board;
    newBoard.flipTile(rowIndex, colIndex);
    this.setState({
      board: newBoard
    });
  }

  playMove(rowIndex, columnIndex) {
    if (this.state.isPlaying && !this.state.isWon) {
      console.log(rowIndex + ", " + columnIndex);
      this.handleFlipTile(rowIndex, columnIndex);

      if (this.state.board.playerBoard[rowIndex][columnIndex] === "B") {
        console.log("Game over!");
        this.state.board.print();
        this.setState({
          isWon: false,
          isPlaying: false
        });
      } else if (this.state.board.hasSafeTiles() === false) {
        console.log("You won!");
        this.setState({
          isWon: true,
          isPlaying: false
        });
      } else {
        console.log("Current board: ");
        this.state.board.print();
      }
    } else {
      console.log("Game over! Press 'New Game' to start over.");
    }
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <h1 className="App-title">
            Minesweepe<span className="blue">React</span>
          </h1>
        </header>
        <Setup onClick={this.handleSideLengthChange} />
        <GameGrid board={this.state.board} playMove={this.playMove} />
      </div>
    );
  }
}

export default App;
