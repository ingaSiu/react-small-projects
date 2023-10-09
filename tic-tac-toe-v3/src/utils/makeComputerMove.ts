import { BoardArray } from '../App';

const makeComputerMove = (board: BoardArray): [number, number] => {
  const emptyCell: [number, number][] = [];
  board.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (!cell) {
        emptyCell.push([rowIndex, cellIndex]);
      }
    });
  });

  const randomIndex = Math.floor(Math.random() * emptyCell.length);
  return emptyCell[randomIndex];
};
export default makeComputerMove;
