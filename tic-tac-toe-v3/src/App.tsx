import './App.scss';

import Board from './components/Board/Board';
import { useState } from 'react';

type BoardArray = Array<Array<string | null>>;

const App = () => {
  const [board, setBoard] = useState<BoardArray>(
    Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => null)),
  );

  const [player, setPlayer] = useState<string>('X');
  const [winner, setWinner] = useState<string | null>(null);

  // function returns string
  // type cell = 'x' | 'o';

  const checkWinner = (board: BoardArray): string | null => {
    const lines = [
      //Rows
      [board[0][0], board[0][1], board[0][2]],
      [board[1][0], board[1][1], board[1][2]],
      [board[2][0], board[2][1], board[2][2]],
      //columns
      [board[0][0], board[1][0], board[2][0]],
      [board[0][1], board[1][1], board[2][1]],
      [board[0][2], board[1][2], board[2][2]],

      //Diagonals
      [board[0][0], board[1][1], board[2][2]],
      [board[0][2], board[1][1], board[2][0]],
    ];
    for (const line of lines) {
      if (line[0] && line[0] === line[1] && line[1] === line[2]) {
        return line[0];
      }
    }
    return null;
  };

  const handleOnClick = (row: number, col: number) => {
    if (board[row][col] || winner) {
      return;
    }

    const updatedPlayerBoard = board.map((newRow, rowIndex) =>
      newRow.map((cell, cellIndex) => (rowIndex === row && cellIndex === col ? player : cell)),
    );
    setBoard(updatedPlayerBoard);

    //check winner
    const newWinner = checkWinner(updatedPlayerBoard);
    setWinner(newWinner);
    setPlayer('X');
  };

  return (
    <div className="game">
      <h1>Tic-Tac-Toe game</h1>
      <Board board={board} handleClick={handleOnClick} />
    </div>
  );
};

export default App;

