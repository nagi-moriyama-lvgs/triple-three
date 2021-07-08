import React, { memo } from "react";
import styled from "styled-components";

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

const Score = styled(BaseScore)`
  & {
    width: 5rem;
    height: 5rem;
    border-radius: 4px;
    background-color: skyblue;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    span {
      color: white;
      font-weight: bold;
    }
  }
`;

export default memo<BaseScoreProps>(Score);
