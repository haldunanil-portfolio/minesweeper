import React, { Component } from "react";
import { Container, Row, Col } from "react-grid-system";
import "./Setup.css";

class Setup extends Component {
  constructor(props) {
    super(props);
    this.state = { length: null };
    this.handleChange = this.handleChange.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
  }

  handleChange(event) {
    this.setState({ length: event.target.value });
  }

  startNewGame() {
    this.props.onClick(this.state.length);
  }

  handleKeyDown(event) {
    // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
    if (event.key === "Enter") {
      this.startNewGame();
    }
  }

  render() {
    return (
      <Container className="Setup-bar" onKeyDown={this.handleKeyDown} fluid>
        <Row>
          <Col>
            <input
              type="number"
              className="Setup-input"
              placeholder="Side length"
              onChange={this.handleChange}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <button className="Setup-button" onClick={this.startNewGame}>
              NEW GAME
            </button>
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Setup;
