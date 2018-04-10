import React, { Component } from "react";
import { Container, Row, Col } from "react-grid-system";
import Select from "react-select";
import "./Setup.css";
import "react-select/dist/react-select.css";

class Setup extends Component {
  constructor(props) {
    super(props);
    this.startNewGame = this.startNewGame.bind(this);
    this.startEasyGame = this.startEasyGame.bind(this);
    this.startNormalGame = this.startNormalGame.bind(this);
    this.startHardGame = this.startHardGame.bind(this);
    this.onSelect = this.onSelect.bind(this);
  }

  startNewGame(sideLength, numberOfBombs) {
    this.props.onClick(sideLength, numberOfBombs);
  }

  startEasyGame() {
    this.props.changeDifficulty("easy");
    this.startNewGame(5, 5);
  }

  startNormalGame() {
    this.props.changeDifficulty("normal");
    this.startNewGame(5, 10);
  }

  startHardGame() {
    this.props.changeDifficulty("hard");
    this.startNewGame(5, 15);
  }

  onSelect(obj) {
    if (obj.value === "easy") {
      this.startEasyGame();
    } else if (obj.value === "normal") {
      this.startNormalGame();
    } else if (obj.value === "hard") {
      this.startHardGame();
    }
  }

  render() {
    return (
      <Container className="Setup-bar" fluid>
        <Row id="desktop-buttons">
          <Col lg={1.5} offset={{ lg: 3.75 }}>
            <button
              className={
                "Setup-button" +
                (this.props.difficulty === "easy" ? " Button-active" : "")
              }
              onClick={this.startEasyGame}
            >
              EASY
            </button>
          </Col>
          <Col lg={1.5}>
            <button
              className={
                "Setup-button" +
                (this.props.difficulty === "normal" ? " Button-active" : "")
              }
              onClick={this.startNormalGame}
            >
              NORMAL
            </button>
          </Col>
          <Col lg={1.5}>
            <button
              className={
                "Setup-button" +
                (this.props.difficulty === "hard" ? " Button-active" : "")
              }
              onClick={this.startHardGame}
            >
              HARD
            </button>
          </Col>
        </Row>
        <Select
          className="Setup-dropdown"
          options={[
            { value: "easy", label: "EASY" },
            { value: "normal", label: "NORMAL" },
            { value: "hard", label: "HARD" }
          ]}
          value={this.props.difficulty}
          placeholder="Select a difficulty level..."
          onChange={this.onSelect}
          searchable={false}
          autoFocus={true}
          clearable={false}
        />
      </Container>
    );
  }
}

export default Setup;
