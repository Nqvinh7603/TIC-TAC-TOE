/* eslint-disable react/prop-types */
import React from "react";

const Cell = ({ value, onClick, className }) => {
  return (
    <div className="game-cell" onClick={onClick}>
      {value}
    </div>
  );
};

export default Cell;
