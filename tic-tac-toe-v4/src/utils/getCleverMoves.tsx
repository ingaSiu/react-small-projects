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

  if (cleverMoves.length > 0) {
    return cleverMoves[0];
  }

  // oponnent moves

  // choose the center cell

  // random move
};

export default getCleverMoves;
