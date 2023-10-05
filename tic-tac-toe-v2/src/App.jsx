import { useEffect, useState } from 'react';

import Cell from './components/Cell';

const App = () => {
  const [cells, setCells] = useState(['', '', '', '', '', '', '', '', '']);
  const [go, setGo] = useState('circle');
  const [winningMessage, setWinningMessage] = useState(null);
  console.log(cells);
  const message = 'It is now ' + go + 's turn';

  const checkScore = () => {
    const winningCombos = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    const isBoardFull = cells.every((cell) => cell === 'circle' || cell === 'cross');

    winningCombos.forEach((array) => {
      let circleWins = array.every((cell) => cells[cell] === 'circle');

      if (circleWins) {
        setWinningMessage('Circle wins!');
        return;
      }
    });

    winningCombos.forEach((array) => {
      let crossWins = array.every((cell) => cells[cell] === 'cross');

      if (crossWins) {
        setWinningMessage('Cross wins!');
        return;
      }
    });

    if (isBoardFull && !winningMessage) {
      setWinningMessage("It's a draw!"); // Set the message for a draw
      return;
    }
  };

  const handleRestart = () => {
    setCells(['', '', '', '', '', '', '', '', '']); // Reset cells to initial state
    setGo('circle'); // Set the turn to the initial player
    setWinningMessage(null); // Clear the winning message
  };

  useEffect(() => {
    checkScore();
  }, [cells]);

  return (
    <div className="app">
      <div className="gameBoard">
        {cells.map((cell, index) => (
          <Cell
            key={index}
            id={index}
            cell={cell}
            setCells={setCells}
            go={go}
            setGo={setGo}
            cells={cells}
            winningMessage={winningMessage}
          />
        ))}
      </div>
      <p>{winningMessage || message}</p>
      <button className="button" onClick={handleRestart}>
        Restart game
      </button>
    </div>
  );
};

export default App;

