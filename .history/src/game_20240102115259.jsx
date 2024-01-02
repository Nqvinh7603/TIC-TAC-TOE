// import React, { useState } from "react";
// import Board from "./Board";
// import "./GameStyles.css";
// import { calculateWinner } from "./helper";
// const Game = () => {
//   const [board, setBoard] = useState(Array(9).fill(null));
//   const [xIsNext, setXIsNext] = useState(true);
//   const winner = calculateWinner(board);
//   const handleClick = (index) => {
//     const boardCopy = [...board];
//     if (winner || boardCopy[index]) {
//       return;
//     }
//     boardCopy[index] = xIsNext ? "X" : "O";
//     setBoard(boardCopy);
//     setXIsNext((xIsNext) => !xIsNext);
//   };
//   const handleResetGame = () => {
//     setBoard(Array(9).fill(null));
//     setXIsNext(true);
//   };
//   return (
//     <div>
//       <Board cells={board} onClick={handleClick}></Board>
//       {winner && (
//         <div className="game-winner">Người chiến thắng là {winner}</div>
//       )}

//       <button onClick={handleResetGame} className="game-reset">
//         Reset
//       </button>
//     </div>
//   );
// };

// export default Game;
import React, { useState } from "react";
import Board from "./Board";
import "./GameStyles.css";
import { calculateWinner } from "./helper";

const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [isSinglePlayer, setIsSinglePlayer] = useState(true);
  const winner = calculateWinner(board);

  const handleClick = (index) => {
    const boardCopy = [...board];
    if (winner || boardCopy[index]) {
      return;
    }
    boardCopy[index] = xIsNext ? "X" : "O";
    setBoard(boardCopy);
    setXIsNext((xIsNext) => !xIsNext);

    if (isSinglePlayer && !winner && !xIsNext) {
      setTimeout(() => {
        makeAIMove();
      }, 500);
    }
  };

  const handleResetGame = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
  };

  const toggleSinglePlayerMode = () => {
    setBoard(Array(9).fill(null));
    setXIsNext(true);
    setIsSinglePlayer((prevMode) => !prevMode);
  };

  const isBoardFull = (board) => {
    return board.every((cell) => cell !== null);
  };

  const makeAIMove = () => {
    if (winner || isBoardFull(board)) {
      return;
    }

    let bestScore = -Infinity;
    let bestMove = null;

    for (let i = 0; i < board.length; i++) {
      if (board[i] === null) {
        board[i] = "O";
        const score = minimax(board, 0, false);
        board[i] = null;

        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    handleClick(bestMove);
  };

  const minimax = (board, depth, isMaximizing) => {
    const result = calculateWinner(board);
    if (result !== null) {
      return result === "X" ? -10 + depth : 10 - depth;
    }

    if (isBoardFull(board)) {
      return 0;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = "O";
          const score = minimax(board, depth + 1, false);
          board[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
          board[i] = "X";
          const score = minimax(board, depth + 1, true);
          board[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  return (
    <div>
      <Board cells={board} onClick={handleClick}></Board>
      {winner && (
        <div className="game-winner">Người chiến thắng là {winner}</div>
      )}

      <button onClick={handleResetGame} className="game-reset">
        Reset
      </button>

      <button onClick={toggleSinglePlayerMode} className="toggle-mode">
        {isSinglePlayer ? "Chơi với người khác" : "Chơi với máy"}
      </button>
    </div>
  );
};

export default Game;
