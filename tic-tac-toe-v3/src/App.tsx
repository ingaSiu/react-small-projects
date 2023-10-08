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

  const checkWinner = (board) => {
    const lines = [];
  };

  const handleOnClick = (row: number, col: number) => {
    if (board[row][col] || winner) {
      return;
    }

    const updatedPlayerBoard = board.map((newRow, rowIndex) =>
      newRow.map((cell, cellIndex) => (rowIndex === row && cellIndex === col ? player : cell)),
    );
    setBoard(updatedPlayerBoard);
  };

  return (
    <div className="game">
      <h1>Tic-Tac-Toe game</h1>
      <Board board={board} handleClick={handleOnClick} />
    </div>
  );
};

export default App;

