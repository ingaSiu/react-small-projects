/* eslint-disable react/prop-types */
import './App.css';

import Board from './components/Board/Board';
import { useState } from 'react';

const Game = () => {
  const initialHistory = [Array(9).fill(null)];
  const [history, setHistory] = useState(initialHistory);
  const [currentMove, setCurrentMove] = useState(0);
  const [isAscending, setIsAscending] = useState(true);

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

  const toggleSort = () => {
    setIsAscending(!isAscending);
  };

  const moves = [...history].map((squares, move) => {
    let description;
    if (move === currentMove) {
      description = 'You are at move #' + move;
    } else if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    return (
      <li key={move}>
        {move === currentMove ? (
          <span className="currentMove">{description}</span>
        ) : (
          <button onClick={() => jumpTo(move)}>{description}</button>
        )}
      </li>
    );
  });

  const handleReset = () => {
    setHistory(initialHistory);
    setCurrentMove(0);
  };

  return (
    <div className="game">
      <div className="gameContainer">
        <div className="gameBoard">
          <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />

          <button className="resetBtn" onClick={handleReset}>
            Reset game
          </button>
        </div>

        <div className="gameInfo">
          <div>
            <button className="sortBtn" onClick={toggleSort}>
              {isAscending ? 'Sort Descending ↓' : 'Sort Ascending ↑'}
            </button>
          </div>
          <ol>{isAscending ? moves : moves.reverse()}</ol>
        </div>
      </div>
    </div>
  );
};
export default Game;

