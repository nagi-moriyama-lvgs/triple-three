import React, { memo, useState, useCallback } from "react";
import styled from "styled-components";
import Adder from "~/components/atoms/Adder";
import Button from "~/components/atoms/Button";
import Hands from "~/components/molecules/Hands";
import NineSquares from "~/components/molecules/NineSquares";

type BaseTripleThreeCoreProps = {
  className?: string;
};

const BaseTripleThreeCore: React.FC<BaseTripleThreeCoreProps> = ({
  className,
}) => {
  // Adder
  const initializeAdderValues = [...Array(6)].map((_, index) => ({
    index: index,
    value: "",
  }));
  const [adderValues, setAdderValues] = useState(initializeAdderValues);

  // Hands
  const [hands, setHands] = useState([3, 7]);
  const changeHands = () => {
    setHands([hands[1], hands[0]]);
    const [{ index }] = adderValues.filter(({ value }) => !!value);
    const newAdderValues = [...Array(6)].map((_, index) => ({
      index,
      value: "",
    }));
    newAdderValues[index].value = `+${hands[1]}`;
    setAdderValues(newAdderValues);
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
  const [squares, setSquares] = useState<number[][]>([
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ]);

  // button
  const onClickCalculate = () => {
    const [index] = adderValues.filter(({ value }) => !!value);
    if (!!index) {
      const adderIndex = index.index;
      const newSquareValues = squares.map((row, i) =>
        row.map((value, j) => {
          // column adder
          if (adderIndex <= 2 && adderIndex === j)
            return squares[i][j] + hands[0];
          // row adder
          if (adderIndex > 2 && adderIndex - 3 === i)
            return squares[i][j] + hands[0];
          return value;
        })
      );
      setSquares(newSquareValues);
    } else {
      alert("choose any row or column.");
    }
  };

  // Squareに3の倍数が存在するかチェック
  const result = squares.map((row) =>
    row.map((value) => {
      if (value % 3 === 0) return true;
    })
  );
  console.log(result);

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
      <Button className={"button_area"} onClick={onClickCalculate} />
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
