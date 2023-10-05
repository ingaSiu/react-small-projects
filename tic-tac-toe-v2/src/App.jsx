import Cell from './components/Cell';
import { useState } from 'react';

const App = () => {
  const [cells, setCells] = useState(['', '', '', '', '', '', '', '', '']);
  const [go, setGo] = useState('circle');
  const [winningMessage, setWinningMessage] = useState(null);
  console.log(cells);
  const message = 'It is now ' + go + 's turn';
  return (
    <div className="app">
      <div className="gameBoard">
        {cells.map((cell, index) => (
          <Cell key={index} id={index} cell={cell} setCells={setCells} go={go} setGo={setGo} cells={cells} />
        ))}
      </div>
      <p>{message}</p>
    </div>
  );
};

export default App;

