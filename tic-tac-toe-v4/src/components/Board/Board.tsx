import './Board.scss';

type BoardProps = {
  board: Array<Array<string | null>>;
  handleClick: (row: number, col: number) => void;
};

const Board = ({ board, handleClick }: BoardProps) => {
  return (
    <div className="board">
      {board.map((row, rowIndex) => (
        <div key={rowIndex} className="boardRow">
          {row.map((cell, cellIndex) => (
            <button
              key={cellIndex}
              className={`cell ${cell ? `cell_${cell.toLowerCase()}` : ''}  `}
              onClick={() => handleClick(rowIndex, cellIndex)}
            >
              {cell}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Board;
