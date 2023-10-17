/* eslint-disable react/prop-types */

import './Square.css';

const Square = ({ value, onSquareClick, isWinning }) => {
  return (
    <button className={`square ${isWinning ? 'winning' : ''}`} onClick={onSquareClick}>
      {value}
    </button>
  );
};

export default Square;
