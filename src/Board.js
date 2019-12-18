import React from "react";
import PropTypes from "prop-types";

import Cell from "./Cell.js";

const Board = React.forwardRef(
  ({ width, height, cellSize, handleCellClick, cells }, ref) => (
    <div
      className="board"
      style={{
        width: width,
        height: height,
        backgroundSize: `${cellSize}px ${cellSize}px`
      }}
      onClick={handleCellClick}
      ref={ref}
    >
      {cells.map(cell => (
        <Cell
          x={cell.x}
          y={cell.y}
          key={`${cell.x}, ${cell.y}`}
          cellSize={cellSize}
        />
      ))}
    </div>
  )
);

Board.propTypes = {
  width: PropTypes.number.isRequired,
  height: PropTypes.number.isRequired,
  cellSize: PropTypes.number.isRequired,
  handleCellClick: PropTypes.func.isRequired,
  cells: PropTypes.array.isRequired
};

export default Board;
