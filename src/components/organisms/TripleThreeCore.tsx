import React, { memo, useState, useCallback } from "react";
import styled from "styled-components";
import Adder from "~/components/atoms/Adder";
import Button from "~/components/atoms/Button";
import Score from "~/components/atoms/Score";
import Hands from "~/components/molecules/Hands";
import NineSquares from "~/components/molecules/NineSquares";
import Square from "../atoms/Square";

type BaseTripleThreeCoreProps = {
  className?: string;
};

// local storageでbestスコアを表示
// local storageで現在の状態を保持
// resetボタンを作成

const BaseTripleThreeCore: React.FC<BaseTripleThreeCoreProps> = ({
  className,
}) => {
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

  // Adder
  const initializeAdderValues = [...Array(6)].map((_, index) => ({
    index: index,
    value: "",
  }));
  const [adderValues, setAdderValues] = useState(initializeAdderValues);

  const resetAdder = () => {
    const newAdderValues = [...Array(6)].map((_, index) => ({
      index: index,
      value: "",
    }));
    setAdderValues(newAdderValues);
  };

  // Hands
  const [hands, setHands] = useState([3, 7]);
  const changeHands = () => {
    setHands([hands[1], hands[0]]);
    // ======= adderを設定していないときにはindexがない！！！！=============
    const [{ index }] = adderValues.filter(({ value }) => !!value);
    const newAdderValues = [...Array(6)].map((_, index) => ({
      index,
      value: "",
    }));
    newAdderValues[index].value = `+${hands[1]}`;
    setAdderValues(newAdderValues);
  };

  const drawNewHand = () => {
    setHands([
      hands[1],
      INITIAL_VALUES[Math.floor(Math.random() * INITIAL_VALUES.length)],
    ]);
  };

  // adderをクリックした時にvalueを差し替える
  const onClickSelect = useCallback(
    (event) => {
      const newAdderValues = [...Array(6)].map((_, index) => ({
        index: index,
        value: "",
      }));
      newAdderValues[event.currentTarget.dataset.index].value = `+${hands[0]}`;
      setAdderValues(newAdderValues);
    },
    [hands]
  );

  // Squares
  const [squares, setSquares] = useState<number[][]>(initialSquares);
  //   [
  //   [1, 2, 3],
  //   [4, 5, 6],
  //   [7, 8, 9],
  // ]

  // button
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
    } else {
      alert("choose any rows or columns.");
    }
  };

  // Score
  let score = 0;
  squares.forEach((row) => {
    row.forEach((square) => {
      if (!(square % 3 === 0)) score += square;
    });
  });

  const [buttonState, setButtonState] = React.useState(false);
  // ゲームオーバーの確認
  if (!buttonState) {
    let multipleOfThree = 0;
    squares.forEach((row) =>
      row.forEach((square) => {
        if (square % 3 === 0) multipleOfThree++;
      })
    );
    if (multipleOfThree >= GAMEOVER_COUNT) setButtonState(true);
  }

  return (
    <div className={className}>
      <div className={"empty_area"}></div>
      <div className={"top_area"}>
        <Adder onClick={onClickSelect} {...adderValues[0]} />
        <Adder onClick={onClickSelect} {...adderValues[1]} />
        <Adder onClick={onClickSelect} {...adderValues[2]} />
      </div>
      <div className={"left_area"}>
        <Adder onClick={onClickSelect} {...adderValues[3]} />
        <Adder onClick={onClickSelect} {...adderValues[4]} />
        <Adder onClick={onClickSelect} {...adderValues[5]} />
      </div>
      <div className={"main_area"}>
        <NineSquares defaultValues={squares} />
      </div>
      <div className={"hand_area"}>
        <Hands values={hands} onClick={changeHands} />
      </div>
      <div className={"button_area"}>
        <Button onClick={onClickCalculate} disabled={buttonState} />
        <Score number={score} />
      </div>
    </div>
  );
};

const TripleThreeCore = styled(BaseTripleThreeCore)`
  & {
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
