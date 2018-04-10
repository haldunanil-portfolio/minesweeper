import React, { Component } from "react";
import { Container, Row, Col } from "react-grid-system";
import "./Setup.css";

class Setup extends Component {
  constructor(props) {
    super(props);
    this.startNewGame = this.startNewGame.bind(this);
    this.startEasyGame = this.startEasyGame.bind(this);
    this.startNormalGame = this.startNormalGame.bind(this);
    this.startHardGame = this.startHardGame.bind(this);
  }

  startNewGame(sideLength, numberOfBombs) {
    this.props.onClick(sideLength, numberOfBombs);
  }

  startEasyGame() {
    this.startNewGame(5, 5);
  }

  startNormalGame() {
    this.startNewGame(5, 10);
  }

  startHardGame() {
    this.startNewGame(5, 15);
  }

  render() {
    return (
      <Container className="Setup-bar" fluid>
        <Row>
          <Col lg={1.5} offset={{ lg: 3.75 }}>
            <button className="Setup-button" onClick={this.startEasyGame}>
              EASY
            </button>
          </Col>
          <Col lg={1.5}>
            <button className="Setup-button" onClick={this.startNormalGame}>
              NORMAL
            </button>
          </Col>
          <Col lg={1.5}>
            <button className="Setup-button" onClick={this.startHardGame}>
              HARD
            </button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Setup;
