import React, { memo, useState, useCallback, useRef } from "react";
import styled from "styled-components";
import Adder from "~/components/atoms/Adder";
import Button from "~/components/atoms/Button";
import Score from "~/components/atoms/Score";
import Hands from "~/components/molecules/Hands";
import NineSquares from "~/components/molecules/NineSquares";

type BaseTripleThreeCoreProps = {
  className?: string;
};

// local storageでbestスコアを表示

const BaseTripleThreeCore: React.FC<BaseTripleThreeCoreProps> = ({
  className,
}) => {
  // 初期値の定義
  const GAMEOVER_COUNT = 3;
  const INITIAL_VALUES = [1, 2, 4, 5, 7, 8];
  const initialSquares: number[][] = [
    [
      INITIAL_VALUES[Math.floor(Math.random() * INITIAL_VALUES.length)],
      INITIAL_VALUES[Math.floor(Math.random() * INITIAL_VALUES.length)],
      INITIAL_VALUES[Math.floor(Math.random() * INITIAL_VALUES.length)],
    ],
    [
      INITIAL_VALUES[Math.floor(Math.random() * INITIAL_VALUES.length)],
      INITIAL_VALUES[Math.floor(Math.random() * INITIAL_VALUES.length)],
      INITIAL_VALUES[Math.floor(Math.random() * INITIAL_VALUES.length)],
    ],
    [
      INITIAL_VALUES[Math.floor(Math.random() * INITIAL_VALUES.length)],
      INITIAL_VALUES[Math.floor(Math.random() * INITIAL_VALUES.length)],
      INITIAL_VALUES[Math.floor(Math.random() * INITIAL_VALUES.length)],
    ],
  ];
  const localStorageSquares = JSON.parse(localStorage.getItem("squares")!);
  const [squares, setSquares] = useState<number[][]>(
    localStorageSquares || initialSquares
  );
  //   [
  //   [1, 2, 3],
  //   [4, 5, 6],
  //   [7, 8, 9],
  // ]
  let score = 0;
  squares.forEach((row) => {
    row.forEach((square) => {
      if (!(square % 3 === 0)) score += square;
    });
  });

  const localStorageBestScore = Number(localStorage.getItem("best"));
  const bestScore =
    localStorageBestScore > score ? localStorageBestScore : score;
  // bestをlocalStorageに格納
  const setBestOnLocalStorage = (score: number) => {
    localStorage.setItem("best", String(score));
  };

  // SquaresをlocalStorageに格納
  const setSquaresOnLocalStorage = (squares: number[][]) => {
    localStorage.setItem("squares", JSON.stringify(squares));
  };
  // handsをlocalStorageに格納
  const setHandsOnLocalStorage = (hands: [number, number]) => {
    localStorage.setItem("hands", JSON.stringify(hands));
  };

  // Adder
  type AdderType = {
    index: number;
    value: string;
  };
  const createEmptyAdder: () => AdderType[] = () => {
    return [...Array(6)].map((_, index) => ({
      index: index,
      value: "",
    }));
  };
  const [adderValues, setAdderValues] = useState<AdderType[]>(
    createEmptyAdder()
  );
  const resetAdder = (): void => setAdderValues(createEmptyAdder());

  // Hands
  const localStorageHands = JSON.parse(localStorage.getItem("hands")!);
  const [hands, setHands] = useState<[number, number]>(
    (localStorageSquares && localStorageHands) || [
      INITIAL_VALUES[Math.floor(Math.random() * INITIAL_VALUES.length)],
      INITIAL_VALUES[Math.floor(Math.random() * INITIAL_VALUES.length)],
    ]
  );
  const changeHands = () => {
    setHands([hands[1], hands[0]]);
    setHandsOnLocalStorage([hands[1], hands[0]]);
    const [index] = adderValues.filter(({ value }) => !!value);
    if (!!index) {
      const adderIndex = index.index;
      const newAdderValues = createEmptyAdder();
      newAdderValues[adderIndex].value = `+${hands[1]}`;
      setAdderValues(newAdderValues);
    }
  };
  const drawNewHand = () => {
    setHands([
      hands[1],
      INITIAL_VALUES[Math.floor(Math.random() * INITIAL_VALUES.length)],
    ]);
  };
  const inputHandOnAdder = useCallback(
    (event) => {
      const newAdderValues = createEmptyAdder();
      newAdderValues[event.currentTarget.dataset.index].value = `+${hands[0]}`;
      setAdderValues(newAdderValues);
    },
    [hands]
  );

  const onClickCalculate = () => {
    const [index] = adderValues.filter(({ value }) => !!value);
    if (!!index) {
      const adderIndex = index.index;
      const newSquareValues = squares.map((row, i) =>
        row.map((value, j) => {
          // column adder
          if (adderIndex <= 2 && adderIndex === j && squares[i][j] % 3 != 0)
            return squares[i][j] + hands[0];
          // row adder
          if (adderIndex > 2 && adderIndex - 3 === i && squares[i][j] % 3 != 0)
            return squares[i][j] + hands[0];
          return value;
        })
      );
      resetAdder();
      drawNewHand();
      setSquares(newSquareValues);
      setSquaresOnLocalStorage(newSquareValues);
      setBestOnLocalStorage(bestScore);
    } else {
      alert("choose any rows or columns.");
    }
  };

  const [buttonState, setButtonState] = React.useState(false);
  // ゲームオーバーの確認
  if (!buttonState) {
    let inActiveSuqareCount = 0;
    squares.forEach((row) =>
      row.forEach((square) => {
        if (square % 3 === 0) inActiveSuqareCount++;
      })
    );
    if (inActiveSuqareCount >= GAMEOVER_COUNT) setButtonState(true);
  }

  const reset = () => {
    setSquares(initialSquares);
    setAdderValues(createEmptyAdder);
    localStorage.removeItem("squares");
    localStorage.removeItem("hands");
  };

  return (
    <div className={className}>
      <div className={"empty_area"}></div>
      <div className={"top_area"}>
        <Adder onClick={inputHandOnAdder} {...adderValues[0]} />
        <Adder onClick={inputHandOnAdder} {...adderValues[1]} />
        <Adder onClick={inputHandOnAdder} {...adderValues[2]} />
      </div>
      <div className={"left_area"}>
        <Adder onClick={inputHandOnAdder} {...adderValues[3]} />
        <Adder onClick={inputHandOnAdder} {...adderValues[4]} />
        <Adder onClick={inputHandOnAdder} {...adderValues[5]} />
      </div>
      <div className={"main_area"}>
        <NineSquares defaultValues={squares} />
      </div>
      <div className={"hand_area"}>
        <Hands values={hands} onClick={changeHands} />
      </div>
      <div className={"button_area"}>
        <Button
          onClick={onClickCalculate}
          disabled={buttonState}
          value={"Add"}
        />
        <Button onClick={reset} value={"reset"} />
        <Score number={score} />
        <div>best score is {bestScore}</div>
      </div>
    </div>
  );
};

const TripleThreeCore = styled(BaseTripleThreeCore)`
  & {
    margin-bottom: 100px;
    display: grid;
    grid-template-rows: 100px 300px 100px;
    grid-template-columns: 100px 200px 100px;
    .empty_area {
      grid-row: 1 / 2;
      grid-column: 1 / 2;
    }
    .top_area {
      grid-row: 1 / 2;
      grid-column: 2 / 3;
      display: flex;
    }
    .left_area {
      grid-row: 2 / 3;
      grid-column: 1 / 2;
    }
    .main_area {
      grid-row: 2 / 3;
      grid-column: 2 / 4;
    }
    .hand_area {
      grid-row: 3 / 4;
      grid-column: 2 / 3;
      display: flex;
      .hand {
        cursor: pointer;
      }
    }
    .button_area {
      grid-row: 3 / 4;
      grid-column: 3 / 4;
    }
  }
`;

export default memo<BaseTripleThreeCoreProps>(TripleThreeCore);
