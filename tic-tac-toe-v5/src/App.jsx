/* eslint-disable react/prop-types */
import './App.css';

import Board from './components/Board/Board';
import { useState } from 'react';

const Game = () => {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [currentMove, setCurrentMove] = useState(0);

  const xIsNext = currentMove % 2 === 0;

  // modify the game component to render the currently selected move,
  //  instead of always rendering the final move
  const currentSquares = history[currentMove];

  // If you “go back in time” and then make a new move from that point, you only want to keep
  // the history up to that point. Instead of adding nextSquares after all items (... spread syntax)
  //  in history, you’ll add it after all items in history.slice(0, currentMove + 1) so that you’re
  //  only keeping that portion of the old history.

  // Each time a move is made, you need to update currentMove to point to the latest history entry.

  const handlePlay = (nextSquares) => {
    const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
    setHistory(nextHistory);
    setCurrentMove(nextHistory.length - 1);
  };

  const jumpTo = (nextMove) => {
    setCurrentMove(nextMove);
  };

  const moves = history.map((squares, move) => {
    let description;
    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  });
  return (
    <div className="game">
      <div className="gameBoard">
        <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
      </div>
      <div className="gameInfo">
        <ol>{moves}</ol>
      </div>
    </div>
  );
};
export default Game;

