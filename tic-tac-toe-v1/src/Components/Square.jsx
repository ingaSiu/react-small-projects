import './Square.css';

// eslint-disable-next-line react/prop-types
const Square = ({ value, chooseSquare }) => {
  return (
    <div className="square" onClick={chooseSquare}>
      {value}
    </div>
  );
};

export default Square;
