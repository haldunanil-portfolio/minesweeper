export class Board {
	constructor(numberOfRows, numberOfColumns, numberOfBombs) {
		this._numberOfBombs = numberOfBombs;
		this._numberOfTiles = numberOfRows * numberOfColumns;
		this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
		this._bombBoard = Board.generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
	}

	get playerBoard() {
		return this._playerBoard;
	}

	get bombBoard() {
		return this._bombBoard;
	}

	get numberOfBombs() {
		return this._numberOfBombs;
	}

	flipTile(rowIndex, columnIndex) {
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

	getNumberOfNeighborBombs(rowIndex, columnIndex){
		const neighborOffsets = [
			[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]
		];

		// get the number of rows and cols to determine whether to exclude certain offsets
		const numberOfRows = this._bombBoard.length;
		const numberOfColumns = this._bombBoard[0].length;
		let numberOfBombs = 0;

		// iterate through each of the (valid) neighbor spots to count the number of bombs
		neighborOffsets.forEach(offset => {
			const neighborRowIndex = rowIndex + offset[0];
			const neighborColumnIndex = columnIndex + offset[1];

			// check if the above indices are valid (i.e. not off the board)
			if (neighborRowIndex >= 0 && neighborRowIndex < numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
				// check if bomb exists and increment total count if yes
				if (this._bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
					numberOfBombs++;
				}
			}
		});

		// return total number of adjacent bombs
		return numberOfBombs;
	}

	hasSafeTiles() {
		return Number(this._numberOfTiles) !== Number(this._numberOfBombs);
	}

	print() {
		console.log(this._playerBoard.map(row => row.join(' | ')).join('\n'));
	}


	static generatePlayerBoard(numberOfRows, numberOfColumns) {
		let board = [];
		for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
			let row = [];
			for (let colIndex = 0; colIndex < numberOfColumns; colIndex++) {
				row.push(' ');
			}
			board.push(row);
		}
		return board;
	}

	static generateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
		let board = [];
		for (let rowIndex = 0; rowIndex < numberOfRows; rowIndex++) {
			let row = [];
			for (let colIndex = 0; colIndex < numberOfColumns; colIndex++) {
				row.push(null);
			}
			board.push(row);
		}

		// place bombs, keep going until desired number of bombs are placed
		let numberOfBombsPlaced = 0;  // keep track of bombs placed on the board
		while (numberOfBombsPlaced < numberOfBombs) {
			// todo: need to fix overlapping bombs

			let randomRowIndex = Math.floor(Math.random() * numberOfRows);  // randomly pick a row on the board to add a bomb to
			let randomColIndex = Math.floor(Math.random() * numberOfColumns);  // randomly pick a column on the board to add a bomb to

			if (board[randomRowIndex][randomColIndex] !== 'B') {
				board[randomRowIndex][randomColIndex] = 'B';  // place a bomb
				numberOfBombsPlaced++;  // increment
			}
		}

		// return the bomb board
		return board;	
	}

};
