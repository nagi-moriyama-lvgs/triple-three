import React, { memo } from "react";
import styled from "styled-components";

type BaseSquareProps = {
  className?: string;
  number: number;
};

const BaseSquare: React.FC<BaseSquareProps> = ({ className, number }) => {
  return (
    <div className={className}>
      <h1>{number}</h1>
    </div>
  );
};

const Square = styled(BaseSquare)`
  & {
    h1 {
      color: red;
    }
  }
`;

export default memo<BaseSquareProps>(Square);
