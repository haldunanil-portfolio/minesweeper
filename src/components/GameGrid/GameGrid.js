import React, { Component } from "react";
import { Container, Row, Col } from "react-grid-system";
import "./GameGrid.css";

import Tile from "../Tile/Tile";

class GameGrid extends Component {
  constructor(props) {
    super(props);
    this.drawBoard = this.drawBoard.bind(this);
  }

  drawBoard() {
    const playerBoard = this.props.board.playerBoard;

    return playerBoard.map((row, rowIndex) => {
      const newRow = row.map((col, colIndex) => {
        return (
          <Col key={"col_" + colIndex}>
            <Tile
              playerBoardElement={playerBoard[rowIndex][colIndex]}
              playMove={this.props.playMove}
              rowIndex={rowIndex}
              colIndex={colIndex}
              didWin={this.props.didWin}
              tileState={this.props.tiles[rowIndex][colIndex]}
              updateTile={this.props.updateTile}
            />
          </Col>
        );
      });
      return <Row key={"row_" + rowIndex}>{newRow}</Row>;
    });
  }

  render() {
    return (
      <Container fluid>
        <Row>
          <Col sm={6} xl={4.5} offset={{ sm: 3, xl: 3.75 }}>
            {this.props.board ? this.drawBoard() : null}
          </Col>
        </Row>
      </Container>
    );
  }
}

export default GameGrid;
