// Squaresを扱うロジック
type squaresType = number[][];

export const useSquares = (
  squares,
  adders,
  hands,
  bestScore,
  getScore: (_: number[][]) => number,
  setAdders: (_: number[]) => void,
  setSquares,
  drawNewHand,
  setGameOver,
  isGameOver
) => {
  const addMainHandToSquares: (hand: number, index: number) => squaresType = (
    hand,
    index
  ) => {
    setAdders([0, 0, 0, 0, 0, 0]);
    const newSquares = squares.map((row, i) =>
      row.map((value, j) => {
        if (index <= 2 && index === j && squares[i][j] % 3 != 0)
          return squares[i][j] + hand;
        if (index > 2 && index - 3 === i && squares[i][j] % 3 != 0)
          return squares[i][j] + hand;
        return value;
      })
    );
    return newSquares;
  };
  const onClickAddButton = () => {
    const [adderIndex] = adders.flatMap((v, i) => (v !== 0 ? i : []));
    if (adderIndex !== undefined) {
      const newSquares = addMainHandToSquares(hands[0], adderIndex);
      const score = getScore(newSquares);
      if (score > bestScore)
        localStorage.setItem("bestScore", JSON.stringify(score));
      setSquares(newSquares);
      const newHands = drawNewHand();
      localStorage.setItem("squares", JSON.stringify(newSquares));
      localStorage.setItem("hands", JSON.stringify(newHands));
      setGameOver(isGameOver(newSquares));
    } else {
      alert("加算する値をAdderにセットしてください。");
    }
  };
};
