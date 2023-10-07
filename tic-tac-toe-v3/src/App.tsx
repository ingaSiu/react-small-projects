import './App.scss';

import Board from './components/Board/Board';
import { useState } from 'react';

const App = () => {
  const [board, setBoard] = useState<any>(Array.from({ length: 3 }, () => Array.from({ length: 3 }, () => null)));
  return (
    <div className="game">
      <h1>Tic-Tac-Toe game</h1>
      <Board board={board} handleClick={() => ''} />
    </div>
  );
};

export default App;

