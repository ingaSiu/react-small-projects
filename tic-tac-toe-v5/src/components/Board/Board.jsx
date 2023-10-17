/* eslint-disable react/prop-types */

import './Board.css';

import Square from '../Square/Square';
import { calculateWinner } from '../../utils/calculateWinner';

const Board = ({ xIsNext, squares, onPlay }) => {
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

  const isBoardFull = squares.every((square) => square !== null);

  const winnerInfo = calculateWinner(squares);
  const winningLine = winnerInfo ? winnerInfo.winningLine : null;

  let status;
  if (winnerInfo) {
    status = 'Winner : ' + winnerInfo.winner + '!';
  } else if (isBoardFull) {
    status = 'Draw! The game is a tie!';
  } else {
    status = 'Next player : ' + (xIsNext ? 'X' : 'O');
  }

  const boardSize = 3; // Assuming a 3x3 board
  const boardRows = Array.from(Array(boardSize).keys());

  return (
    <>
      <div className="status">{status}</div>
      {boardRows.map((row, rowIndex) => (
        <div key={rowIndex} className="boardRow">
          {boardRows.map((col, colIndex) => {
            const squareIndex = rowIndex * boardSize + colIndex;
            const isWinningSquare = winningLine && winningLine.includes(squareIndex);
            return (
              <Square
                key={squareIndex}
                value={squares[squareIndex]}
                onSquareClick={() => handleClick(squareIndex)}
                isWinning={isWinningSquare}
              />
            );
          })}
        </div>
      ))}
    </>
  );
};

export default Board;
