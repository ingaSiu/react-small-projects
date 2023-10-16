/* eslint-disable react/prop-types */

import './Board.css';

import Square from '../Square/Square';
import { calculateWinner } from '../../utils/calculateWinner';

const Board = ({ xIsNext, squares, onPlay }) => {
  const renderSquare = (i) => {
    return <Square value={squares[i]} onSquareClick={() => handleClick(i)} />;
  };
  const handleClick = (i) => {
    if (squares[i] || calculateWinner(squares)) {
      return;
    }

    const nextSquares = squares.slice();

    if (xIsNext) {
      nextSquares[i] = 'X';
    } else {
      nextSquares[i] = 'O';
    }

    onPlay(nextSquares);
  };

  const winner = calculateWinner(squares);
  let status;
  if (winner) {
    status = 'Winner : ' + winner + '!';
  } else {
    status = 'Next player : ' + (xIsNext ? 'X' : 'O');
  }

  const boardSize = 3; // Assuming a 3x3 board
  const boardRows = Array.from(Array(boardSize).keys());

  return (
    <>
      <div className="status">{status}</div>
      {boardRows.map((row) => (
        <div key={row} className="boardRow">
          {boardRows.map((col) => renderSquare(row * boardSize + col))}
        </div>
      ))}
    </>
  );
};

export default Board;
