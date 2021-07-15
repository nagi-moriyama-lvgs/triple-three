import React, { memo } from "react";
import styled from "styled-components";
import * as CC from "~/consts";

type BaseScoreProps = {
  className?: string;
  label?: string;
  number: number;
};

const BaseScore: React.FC<BaseScoreProps> = ({
  className,
  label = "Score",
  number = 0,
}) => {
  return (
    <div className={className}>
      <span>{label}</span>
      <span>{number}</span>
    </div>
  );
};

export const Score = memo<BaseScoreProps>(styled(BaseScore)`
  & {
    width: ${CC.SIZE * 10}px;
    height: ${CC.SIZE * 10}px;
    border-radius: 4px;
    background-color: ${CC.COLOR.PRIMARY};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span {
      color: white;
      font-weight: bold;
    }
  }
`);
