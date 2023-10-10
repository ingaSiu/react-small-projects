const getCleverMoves = (board, player, checkWinner) => {
  const cleverMoves: Array<[number, number]> = [];

  // check winning moves
  board.forEach((row, rowIndex) =>
    row.map((col, colIndex) => {
      if (!board[rowIndex][colIndex]) {
        const clonedBoard = board.map((r) => [...r]);
        clonedBoard[rowIndex][colIndex] = player;
        if (checkWinner(clonedBoard) === player) {
          cleverMoves.unshift([rowIndex][colIndex]);
        }
      }
    }),
  );

  // opponent moves

  const opponent = player === 'X' ? 'O' : 'X';

  board.some((row, rowIndex) =>
    row.some((col, colIndex) => {
      if (!board[rowIndex][colIndex]) {
        const clonedBoard = board.map((r) => [...r]);

        clonedBoard[rowIndex][colIndex] = opponent;

        if (checkWinner(clonedBoard) === opponent) {
          cleverMoves.push([rowIndex][colIndex]);
          return true;
        }
        return false;
      }
    }),
  );

  if (cleverMoves.length > 0) {
    return cleverMoves[0];
  }

  // choose the center cell

  if (!board[1][1]) {
    return [1, 1];
  }

  // random move
  const emptyCells: Array<[number, number]> = [];

  board.forEach((row, rowIndex) =>
    row.forEach((col, colIndex) => {
      if (!board[rowIndex][colIndex]) {
        emptyCells.push([rowIndex, colIndex]);
      }
    }),
  );
  const randomCell = Math.floor(Math.random() * emptyCells.length);

  return emptyCells[randomCell];
};

export default getCleverMoves;
