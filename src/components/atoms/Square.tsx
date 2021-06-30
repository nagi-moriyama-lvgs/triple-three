import React, { memo } from "react";
import styled from "styled-components";

type BaseSquareProps = {
  className?: string;
  number?: number;
  id?: string;
};

const BaseSquare: React.FC<BaseSquareProps> = ({ className, number, id }) => {
  return (
    <div className={className} id={id}>
      <span>{number}</span>
    </div>
  );
};

const Square = styled(BaseSquare)`
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

export default memo<BaseSquareProps>(Square);
