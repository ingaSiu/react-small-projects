import './App.css';

import Board from './components/Board/Board';

const App = () => {
  return (
    <div className="game">
      <h1>Tic-Tac-Toe game</h1>
      <Board board={[]} handleClick={() => ''} />
    </div>
  );
};

export default App;

