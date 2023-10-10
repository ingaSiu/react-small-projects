import './App.scss';

import Board from './components/Board/Board';
import checkWinner from './utils/checkWinner';

import { useState } from 'react';

export type BoardArray = Array<Array<string | null>>;

const App = () => {
  const initialBoard = Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => null));

  const [board, setBoard] = useState<BoardArray>(initialBoard);
  const [player, setPlayer] = useState<string>('X');
  const [winner, setWinner] = useState<string | null>(null);
  const [draw, setDraw] = useState<boolean>(false);

  // function returns string
  // type cell = 'x' | 'o';

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

    // No winner

    const hasNullValue = updatedPlayerBoard.some((row) => row.some((cell) => cell === null));

    if (!winner && !hasNullValue) {
      setDraw(true);
      return;
    }

    // Computer's move
    if (!newWinner) {
      const updatedComputerBoard = updatedPlayerBoard.map((newRow, rowIndex) =>
        newRow.map((cell, cellIndex) => (rowIndex === computerRow && cellIndex === computerCol ? 'O' : cell)),
      );
      setTimeout(() => {
        setBoard(updatedComputerBoard);
        setWinner(checkWinner(updatedComputerBoard));
      }, 200);
    }
  };

  const restartGame = () => {
    setBoard(initialBoard);
    setPlayer('X');
    setWinner(null);
    setDraw(false);
  };
  return (
    <div className="game">
      <h1>Tic-Tac-Toe game</h1>
      <Board board={board} handleClick={handleOnClick} />

      {winner && <p>{winner === 'X' ? 'Player wins!' : 'Computer wins!'}</p>}

      {draw && <p>It's a draw!</p>}
      <button className="reset" onClick={() => restartGame()}>
        Reset game
      </button>
    </div>
  );
};

export default App;

