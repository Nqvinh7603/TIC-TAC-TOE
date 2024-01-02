import React, { useState } from "react";
import Board from "./Board";
import "./GameStyles.css";
const Game = () => {
  const [board, setBoard] = useState(false);
  return (
    <div>
      <Board></Board>
    </div>
  );
};

export default Game;
Game;
