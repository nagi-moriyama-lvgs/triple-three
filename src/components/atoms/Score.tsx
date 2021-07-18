import React from "react";
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
      <span className={"label"}>{label}</span>
      <span className={"score"}>{number}</span>
    </div>
  );
};

export const Score = styled(BaseScore)`
  & {
    width: ${CC.SIZE * 10}px;
    height: ${CC.SIZE * 10}px;
    border-radius: 4px;
    background-color: ${CC.COLOR.GRAY};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    .label {
      color: ${CC.COLOR.PRIMARY};
      font-size: ${CC.SIZE * 1.5}px;
      font-weight: bold;
    }
  }
`;
