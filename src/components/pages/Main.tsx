import React, { useState } from "react";
import styled from "styled-components";
import TripleThree from "~/components/organisms/TripleThree";

type BaseMainProps = {
  className?: string;
};

const BaseMain: React.FC<BaseMainProps> = ({ className }) => {
  // squares
  type squaresType = number[][];
  const INITIAL_VALUES = [1, 2, 4, 5, 7, 8];
  const initialSquares: squaresType = [...Array(3)].map(() =>
    [...Array(3)].map(
      () => INITIAL_VALUES[Math.floor(Math.random() * INITIAL_VALUES.length)]
    )
  );
  const localStorageSquares = JSON.parse(localStorage.getItem("squares")!);
  const [squares, setSquares] = useState<squaresType>(
    localStorageSquares || initialSquares
  );

  // hands
  type handsType = [number, number];
  const localStorageHans = JSON.parse(localStorage.getItem("hands")!);
  const [hands, setHands] = useState<handsType>(
    localStorageHans || [
      INITIAL_VALUES[Math.floor(Math.random() * INITIAL_VALUES.length)],
      INITIAL_VALUES[Math.floor(Math.random() * INITIAL_VALUES.length)],
    ]
  );
  const onChangeHands = () => {
    setHands([hands[1], hands[0]]);
    const [adderIndex] = adders.flatMap((v, i) => (v !== 0 ? i : []));
    if (adderIndex) {
      const adderArray = [0, 0, 0, 0, 0, 0];
      adderArray[adderIndex] = hands[1];
      setAdders(adderArray);
    }
  };
  const drawNewHand: () => handsType = () => {
    const newHands: handsType = [
      hands[1],
      INITIAL_VALUES[Math.floor(Math.random() * INITIAL_VALUES.length)],
    ];
    setHands(newHands);
    return newHands;
  };

  // adders
  const [adders, setAdders] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const onClickAdder = (event: React.MouseEvent) => {
    const adderElement = event.target as HTMLDivElement;
    const adderIndex = Number(adderElement.getAttribute("data-index"));
    const adderArray = [0, 0, 0, 0, 0, 0];
    adderArray[adderIndex] = hands[0];
    setAdders(adderArray);
  };

  // add button
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
    if (adderIndex) {
      const newSquares = addMainHandToSquares(hands[0], adderIndex);
      setSquares(newSquares);
      const newHands = drawNewHand();
      localStorage.setItem("squares", JSON.stringify(newSquares));
      localStorage.setItem("hands", JSON.stringify(newHands));
    }
  };

  return (
    <div className={className}>
      <TripleThree
        adders={adders}
        hands={hands}
        squares={squares}
        onClickAdder={onClickAdder}
        onClickChangeHands={onChangeHands}
        onClickAddButton={onClickAddButton}
      />
    </div>
  );
};

const Main = styled(BaseMain)`
  & {
  }
`;

export default Main;
