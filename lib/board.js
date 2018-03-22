'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
	function Board(numberOfRows, numberOfColumns, numberOfBombs) {
		_classCallCheck(this, Board);

		this._numberOfBombs = numberOfBombs;
		this._numberOfTiles = numberOfRows * numberOfColumns;
		this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
		this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
	}

	_createClass(Board, [{
		key: 'flipTile',
		value: function flipTile(rowIndex, columnIndex) {
			if (this._playerBoard[rowIndex][columnIndex] !== ' ') {
				console.log('This tile has already been flipped!');
				return;
			} else if (this._bombBoard[rowIndex][columnIndex] === 'B') {
				this._playerBoard[rowIndex][columnIndex] = 'B';
			} else {
				this._playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
			}
			this._numberOfTiles--;
		}
	}, {
		key: 'getNumberOfNeighborBombs',
		value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
			var _this = this;

			var neighborOffsets = [[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]];

			// get the number of rows and cols to determine whether to exclude certain offsets
			var numberOfRows = this._bombBoard.length;
			var numberOfColumns = this._bombBoard[0].length;
			var numberOfBombs = 0;

			// iterate through each of the (valid) neighbor spots to count the number of bombs
			neighborOffsets.forEach(function (offset) {
				var neighborRowIndex = rowIndex + offset[0];
				var neighborColumnIndex = columnIndex + offset[1];

				// check if the above indices are valid (i.e. not off the board)
				if (neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
					// check if bomb exists and increment total count if yes
					if (_this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
						numberOfBombs++;
					}
				}
			});

			// return total number of adjacent bombs
			return numberOfBombs;
		}
	}, {
		key: 'hasSafeTiles',
		value: function hasSafeTiles() {
			return this._numberOfTiles === this._numberOfBombs;
		}
	}, {
		key: 'print',
		value: function print() {
			console.log(this._playerBoard.map(function (row) {
				return row.join(' | ');
			}).join('\n'));
		}
	}, {
		key: 'playerBoard',
		get: function get() {
			return this._playerBoard;
		}
	}], [{
		key: 'generatePlayerBoard',
		value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
			var board = [];
			for (var row = 0; row < numberOfRows; row++) {
				var row = [];
				for (var col = 0; col < numberOfColumns; col++) {
					row.push(' ');
				}
				board.push(row);
			}
			return board;
		}
	}, {
		key: 'generateBombBoard',
		value: function generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
			var board = [];
			for (var row = 0; row < numberOfRows; row++) {
				var row = [];
				for (var col = 0; col < numberOfColumns; col++) {
					row.push(null);
				}
				board.push(row);
			}

			// place bombs, keep going until desired number of bombs are placed
			var numberOfBombsPlaced = 0; // keep track of bombs placed on the board
			while (numberOfBombsPlaced < numberOfBombs) {
				// todo: need to fix overlapping bombs

				var randomRowIndex = Math.floor(Math.random() * numberOfRows); // randomly pick a row on the board to add a bomb to
				var randomColIndex = Math.floor(Math.random() * numberOfColumns); // randomly pick a column on the board to add a bomb to

				if (board[randomRowIndex][randomColIndex] !== 'B') {
					board[randomRowIndex][randomColIndex] = 'B'; // place a bomb
					numberOfBombsPlaced++; // increment
				} else {
						// do nothing
					}
			}

			// return the bomb board
			return board;
		}
	}]);

	return Board;
}();

;