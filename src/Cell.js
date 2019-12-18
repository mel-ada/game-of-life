import React from "react";
import PropTypes from "prop-types";

const Cell = ({ x, y, cellSize }) => (
  <div
    className="cell"
    // TODO: Remove inline styling
    style={{
      left: `${cellSize * x + 1}px`,
      top: `${cellSize * y + 1}px`,
      width: `${cellSize - 1}px`,
      height: `${cellSize - 1}px`
    }}
  />
);

Cell.propTypes = {
  x: PropTypes.number.isRequired,
  y: PropTypes.number.isRequired,
  cellSize: PropTypes.number.isRequired
};

export default Cell;
