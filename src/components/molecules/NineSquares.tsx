import React, { memo } from "react";
import styled from "styled-components";
import Square from "components/atoms/Square";

type BaseNineSquaresProps = {
  className?: string;
};

const BaseNineSquares: React.FC<BaseNineSquaresProps> = ({ className }) => {
  return (
    <div className={className}>
      <Square number={1} />
    </div>
  );
};

const NineSquares = styled(BaseNineSquares)`
  & {
    width: 5rem;
    height: 5rem;
    border: 1px solid lightgray;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 2rem;
    }
  }
`;

export default memo<BaseNineSquaresProps>(NineSquares);
