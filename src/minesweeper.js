const generatePlayerBoard = (numberOfRows, numberOfColumns) => {
	let board = [];
	for (let row = 0; row < numberOfRows; row++) {
		let row = [];
		for (let col = 0; col < numberOfColumns; col++) {
			row.push(' ');
		}
		board.push(row);
	}
	return board;
};

const generateBombBoard = (numberOfRows, numberOfColumns, numberOfBombs) => {
	let board = [];
	for (let row = 0; row < numberOfRows; row++) {
		let row = [];
		for (let col = 0; col < numberOfColumns; col++) {
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
		} else {
			// do nothing
		}
	}

	// return the bomb board
	return board;	
};

const getNumberOfNeighborBombs = (bombBoard, rowIndex, columnIndex) => {
	const neighborOffsets = [
		[-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]
	];

	// get the number of rows and cols to determine whether to exclude certain offsets
	const numberOfRows = bombBoard.length;
	const numberOfColumns = bombBoard[0].length;
	let numberOfBombs = 0;

	// iterate through each of the (valid) neighbor spots to count the number of bombs
	neighborOffsets.forEach(offset => {
		const neighborRowIndex = rowIndex + offset[0];
		const neighborColumnIndex = columnIndex + offset[1];

		// check if the above indices are valid (i.e. not off the board)
		if (neighborRowIndex >= 0 && neighborRowIndex <= numberOfRows && neighborColumnIndex >= 0 && neighborColumnIndex < numberOfColumns) {
			// check if bomb exists and increment total count if yes
			if (bombBoard[neighborRowIndex][neighborColumnIndex] === 'B') {
				numberOfBombs++;
			}
		}
	});

	// return total number of adjacent bombs
	return numberOfBombs;
};

const flipTile = (playerBoard, bombBoard, rowIndex, columnIndex) => {
	if (playerBoard[rowIndex][columnIndex] !== ' ') {
		console.log('This tile has already been flipped!');
		return;
	} else if (bombBoard[rowIndex][columnIndex] === 'B') {
		playerBoard[rowIndex][columnIndex] = 'B';
	} else {
		playerBoard[rowIndex][columnIndex] = getNumberOfNeighborBombs(bombBoard, rowIndex, columnIndex);
	}
};

const printBoard = (board) => {
	console.log(board.map(row => row.join(' | ')).join('\n'));
};

// generate a player board
let playerBoard = generatePlayerBoard(3, 4);

// generate a bomb board
let bombBoard = generateBombBoard(3, 4, 5);

// print both boards to console
console.log('Player Board: ')
printBoard(playerBoard);

console.log('Bomb Board: ')
printBoard(bombBoard);

// call flip tile and see what happens!
flipTile(playerBoard, bombBoard, 0, 0);
console.log('Updated Player Board: ');
printBoard(playerBoard);
