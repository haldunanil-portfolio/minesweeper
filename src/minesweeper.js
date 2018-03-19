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
		board[randomRowIndex][randomColIndex] = 'B';  // place a bomb
		numberOfBombsPlaced++;  // increment
	}

	// return the bomb board
	return board;	
};

const printBoard = (board) => {
	console.log(board.map(row => row.join(' | ')).join('\n'));
}

// generate a player board
let playerBoard = generatePlayerBoard(3, 4);

// generate a bomb board
let bombBoard = generateBombBoard(3, 4, 5);

// print both boards to console
console.log('Player Board: ')
printBoard(playerBoard);

console.log('Bomb Board: ')
printBoard(bombBoard);