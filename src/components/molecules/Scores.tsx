import React, { memo } from "react";
import styled from "styled-components";
import { Score, Button } from "~/components/atoms";
import * as CC from "~/consts";

type BaseScoresProps = {
  className?: string;
  score: number;
  bestScore: number;
  onClick: () => void;
};

const BaseScores: React.FC<BaseScoresProps> = ({
  className,
  score,
  bestScore,
  onClick,
}) => {
  return (
    <div className={className}>
      <div className={"scores"}>
        <Score label={"SCORE"} number={score} />
        <Score label={"BEST"} number={bestScore} />
      </div>
      <div className={"new_game"}>
        <Button buttonText={"NEW GAME"} onClick={onClick} />
      </div>
    </div>
  );
};

export const Scores = memo<BaseScoresProps>(styled(BaseScores)`
  & {
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
`);
