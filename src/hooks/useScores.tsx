import { useMemo } from "react";

// Scoreを扱うロジック
type squaresType = number[][];
const localStorageBestScore = Number(localStorage.getItem("best"));

const getScore = (squares: squaresType) => {
  let score = 0;
  const squaresArray = squares.flatMap((_) => _);
  squaresArray.forEach((v) => {
    if (!(v % 3 === 0)) score += v;
  });
  return score;
};

const updateBestScore = (squares: squaresType, best: number) => {
  const score = getScore(squares);
  if (score > best) {
    localStorage.setItem("bestScore", JSON.stringify(score));
  }
};

export const useScores = (squares: squaresType) => {
  const score = useMemo(() => {
    const number = getScore(squares);
    return number;
  }, [squares]);

  const bestScore =
    localStorageBestScore > score ? localStorageBestScore : score;
  return { score, bestScore, getScore, updateBestScore };
};
