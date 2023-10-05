import Cell from './components/Cell';
import { useState } from 'react';

const App = () => {
  const [cells, setCells] = useState(['', '', '', '', '', '', '', '', '']);
  const [go, setGo] = useState('circle');
  const [winningMessage, setWinningMessage] = useState('');
  return (
    <div className="app">
      <div className="gameBoard">
        {cells.map((cell, index) => (
          <Cell key={index} id={index} cell={cell} />
        ))}

        <p></p>
      </div>
    </div>
  );
};

export default App;

