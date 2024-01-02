import React, { useState } from "react";
import Board from "./Board";
import "./GameStyles.css";
import { calculateWinner } from "./helper";
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
const Game = () => {
  const [board, setBoard] = useState(Array(9).fill(null));
  const [xIsNext, setXIsNext] = useState(true);
  const [isSinglePlayer, setIsSinglePlayer] = useState(true);
  const winner = calculateWinner(board);

  const handleClick = (index) => {
    if (winner || board[index]) {
      return;
    }
    const newBoard = [...board];
    newBoard[index] = xIsNext ? "X" : "O";
    setBoard(newBoard);
    setXIsNext(!xIsNext);

    if (isSinglePlayer && !winner && xIsNext) {
      setTimeout(() => {
        makeAIMove(newBoard); // Gọi makeAIMove ngay sau khi người chơi đã đánh nước đi của mình
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

  const makeAIMove = (currentBoard) => {
    if (winner || isBoardFull(currentBoard)) {
      return;
    }

    const bestMove = findBestMove(currentBoard);
    if (bestMove !== null) {
      const newBoard = [...currentBoard];
      newBoard[bestMove] = "O";
      setBoard(newBoard);
      setXIsNext(true);
    }
  };

  const findBestMove = (currentBoard) => {
    let bestScore = -Infinity;
    let bestMove = null;

    for (let i = 0; i < currentBoard.length; i++) {
      if (currentBoard[i] === null) {
        currentBoard[i] = "O";
        const score = minimax(currentBoard, 0, false);
        currentBoard[i] = null;

        if (score > bestScore) {
          bestScore = score;
          bestMove = i;
        }
      }
    }

    return bestMove;
  };

  const minimax = (currentBoard, depth, isMaximizing) => {
    const result = calculateWinner(currentBoard);
    if (result !== null) {
      return result === "X" ? -10 + depth : 10 - depth;
    }

    if (isBoardFull(currentBoard)) {
      return 0;
    }

    if (isMaximizing) {
      let bestScore = -Infinity;
      for (let i = 0; i < currentBoard.length; i++) {
        if (currentBoard[i] === null) {
          currentBoard[i] = "O";
          const score = minimax(currentBoard, depth + 1, false);
          currentBoard[i] = null;
          bestScore = Math.max(score, bestScore);
        }
      }
      return bestScore;
    } else {
      let bestScore = Infinity;
      for (let i = 0; i < currentBoard.length; i++) {
        if (currentBoard[i] === null) {
          currentBoard[i] = "X";
          const score = minimax(currentBoard, depth + 1, true);
          currentBoard[i] = null;
          bestScore = Math.min(score, bestScore);
        }
      }
      return bestScore;
    }
  };

  return (
    // Trong JSX
    <div>
      <Board cells={board} onClick={handleClick}></Board>
      {winner && (
        <div className="game-winner">Người chiến thắng là {winner}</div>
      )}

      <button onClick={handleResetGame} className="game-reset">
        Reset
      </button>
      <button
        className={`mode-toggle ${
          isSinglePlayer ? "single-player" : "multiplayer"
        }`}
        onClick={toggleSinglePlayerMode}
      >
        {isSinglePlayer ? "Chơi với người khác" : "Chơi với máy"}
      </button>
    </div>
  );
};

export default Game;
