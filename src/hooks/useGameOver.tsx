//  GameOverを扱うロジック
import { useState } from "react";
type squaresType = number[][];

const isGameOver = (squares: squaresType): boolean => {
  let counter = 0;
  const squaresArray = squares.flatMap((_) => _);
  squaresArray.forEach((v) => {
    if (v % 3 === 0) counter++;
  });
  return counter >= 3 ? true : false;
};

export const useGameOver = (squares: squaresType) => {
  const [gameOver, setGameOver] = useState(isGameOver(squares));
  return { gameOver, setGameOver, isGameOver };
};
