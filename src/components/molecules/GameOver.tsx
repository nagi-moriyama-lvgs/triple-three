import React, { memo } from "react";
import styled from "styled-components";

type BaseGameOverProps = {
  className?: string;
  score: number;
};

const BaseGameOver: React.FC<BaseGameOverProps> = ({ className, score }) => {
  return (
    <div className={className}>
      <p>Game Over</p>
      <span>{score}</span>
    </div>
  );
};

const GameOver = styled(BaseGameOver)`
  & {
  }
`;

export default memo<BaseGameOverProps>(GameOver);
