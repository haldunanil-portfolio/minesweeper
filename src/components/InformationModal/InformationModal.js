import React, { Component } from "react";
import Modal from "react-modal";
import "./InformationModal.css";

class InformationModal extends Component {
  componentWillMount() {
    Modal.setAppElement("body");
  }

  render() {
    return (
      <Modal
        id="Information-modal"
        isOpen={this.props.isOpen}
        shouldCloseOnOverlayClick={true}
        onRequestClose={() => {
          this.props.handleClose();
        }}
      >
        <h2>How to Play</h2>
        <p>1) Select the level of difficulty you want.</p>
        <p>2) Click or tap on any tile to get started.</p>
        <p>
          3) If a tile has a bomb, you lose. :({" "}
          <em>
            Hint: Right click on a tile to plant a flag so you can keep track of
            suspected bombs!
          </em>
        </p>
        <p>
          4) If a tile shows a number, that tells you how many bombs are around
          that tile. <em>Hint: there can be up to 8 bombs around any tile.</em>
        </p>
        <p>
          5) A tile with a number is safe! Keep on trying to find these without
          blowing up.
        </p>
        <p>
          6) If you find all the tiles without exploding, you win! As an added
          challenge, try to finish faster.
        </p>
        <p>7) Enjoy! :) </p>

        <button className="Modal-screen-close" onClick={this.props.handleClose}>
          CLOSE
        </button>
      </Modal>
    );
  }
}

export default InformationModal;
