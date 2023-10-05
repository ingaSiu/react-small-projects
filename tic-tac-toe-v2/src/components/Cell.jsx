import './Cell.css';

const Cell = (id, cell) => {
  console.log(cell);
  return <div className="square" id={id}></div>;
};

export default Cell;
