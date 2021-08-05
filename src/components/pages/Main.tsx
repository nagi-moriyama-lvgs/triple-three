import React from "react";
import styled from "styled-components";
import { Description } from "~/components/atoms";
import { Scores } from "~/components/molecules";
import { TripleThree, GameOverModal } from "~/components/organisms";
import { useTripleThree } from "~/hooks";
import * as CC from "~/consts";

type BaseMainProps = { className?: string };

const BaseMain: React.FC<BaseMainProps> = ({ className }) => {
  const {
    score,
    bestScore,
    gameOver,
    adders,
    hands,
    squares,
    setGameOver,
    onClickNewGame,
    onClickAdder,
    onChangeHands,
    onClickAddButton,
  } = useTripleThree();

  return (
    <div className={className}>
      <GameOverModal
        open={gameOver}
        score={score}
        setState={setGameOver}
        onClick={onClickNewGame}
      />
      <div className={"header_content"}>
        <h1>Triple Three</h1>
        <Scores score={score} bestScore={bestScore} onClick={onClickNewGame} />
      </div>
      <TripleThree
        adders={adders}
        hands={hands}
        squares={squares}
        buttonDisable={gameOver}
        onClickAdder={onClickAdder}
        onClickChangeHands={onChangeHands}
        onClickAddButton={onClickAddButton}
      />
      <Description />
    </div>
  );
};

export const Main = styled(BaseMain)`
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
    }
  }
`;
