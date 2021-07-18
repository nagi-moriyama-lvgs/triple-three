import React, { useCallback, useState } from "react";
import styled from "styled-components";
import { Score, Button } from "~/components/atoms";
import TripleThree from "~/components/organisms/TripleThree";
import * as CC from "~/consts";

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

  // score
  const getScore: (square: squaresType) => number = (squares) => {
    let score = 0;
    squares.forEach((row) => {
      row.forEach((square) => {
        if (!(square % 3 === 0)) score += square;
      });
    });
    return score;
  };
  const score = getScore(squares);
  const localStorageBestScore = Number(localStorage.getItem("best"));
  const bestScore =
    localStorageBestScore > score ? localStorageBestScore : score;

  // adders
  const [adders, setAdders] = useState<number[]>([0, 0, 0, 0, 0, 0]);
  const onClickAdder = (event: React.MouseEvent) => {
    const adderElement = event.target as HTMLDivElement;
    const adderIndex = Number(adderElement.getAttribute("data-index"));
    const adderArray = [0, 0, 0, 0, 0, 0];
    adderArray[adderIndex] = hands[0];
    setAdders(adderArray);
  };

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
    if (adderIndex !== undefined) {
      const newSquares = addMainHandToSquares(hands[0], adderIndex);
      const score = getScore(newSquares);
      if (score > bestScore)
        localStorage.setItem("bestScore", JSON.stringify(score));
      setSquares(newSquares);
      const newHands = drawNewHand();
      localStorage.setItem("squares", JSON.stringify(newSquares));
      localStorage.setItem("hands", JSON.stringify(newHands));
    } else {
      alert("加算する値をAdderにセットしてください。");
    }
  };

  // new game
  const onClickNewGame = () => {
    localStorage.removeItem("squares");
    localStorage.removeItem("hands");
    setAdders([0, 0, 0, 0, 0, 0]);
    setSquares(initialSquares);
    setHands([
      INITIAL_VALUES[Math.floor(Math.random() * INITIAL_VALUES.length)],
      INITIAL_VALUES[Math.floor(Math.random() * INITIAL_VALUES.length)],
    ]);
  };

  // game over
  const isGameOver: (squares: squaresType) => boolean = (squares) => {
    let inActiveSuqareCount = 0;
    squares.forEach((row) =>
      row.forEach((square) => {
        if (square % 3 === 0) inActiveSuqareCount++;
      })
    );
    if (inActiveSuqareCount >= 3) {
      return true;
    } else {
      return false;
    }
  };
  const buttonDisable = isGameOver(squares);

  return (
    <div className={className}>
      <div className={"header_content"}>
        <h1>Triple Three</h1>
        <div className={"score_content"}>
          <div className={"scores"}>
            <Score label={"SCORE"} number={score} />
            <Score label={"BEST"} number={bestScore} />
          </div>
          <div className={"new_game"}>
            <Button buttonText={"NEW GAME"} onClick={onClickNewGame} />
          </div>
        </div>
      </div>

      {buttonDisable && <p>game over</p>}

      <TripleThree
        adders={adders}
        hands={hands}
        squares={squares}
        buttonDisable={buttonDisable}
        onClickAdder={onClickAdder}
        onClickChangeHands={onChangeHands}
        onClickAddButton={onClickAddButton}
      />

      <hr color={CC.COLOR.GRAY} />
      <div className={"description"}>
        <h2>How To Play</h2>
        <ul>
          <li>The score is the sum of nine numbers.</li>
          <li>You can add hand numbers to columns or rows.</li>
          <li>
            Numbers that are multiples of 3 are not included in the score.
          </li>
          <li>
            Game over when the number of multiples of 3 becomes 3 or more.
          </li>
        </ul>
      </div>
    </div>
  );
};

const Main = styled(BaseMain)`
  & {
    width: ${CC.SIZE * 70}px;
    margin: 0 auto;
    display: flex;
    flex-direction: column;
    align-items: center;

    .header_content {
      width: 100%;
      margin: ${CC.SIZE * 5}px 0 ${CC.SIZE * 3}px;
      display: flex;
      justify-content: space-between;

      h1 {
        color: ${CC.COLOR.LIGHTGRAY};
        font-size: ${CC.SIZE * 5}px;
        letter-spacing: 2px;
      }

      .score_content {
        .scores {
          width: ${CC.SIZE * 21}px;
          display: flex;
          justify-content: space-between;
        }
        .new_game {
          margin-top: ${CC.SIZE * 1}px;
          button {
            width: ${CC.SIZE * 21}px;
            font-size: ${CC.SIZE * 2}px;
          }
        }
      }
    }

    hr {
      width: 100%;
      color: ${CC.COLOR.GRAY};
    }
  }
`;

export default Main;
