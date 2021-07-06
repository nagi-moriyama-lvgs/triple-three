import React, { memo } from "react";
import styled from "styled-components";
import clsx from "clsx";

type BaseSquareProps = {
  className?: string;
  number: number;
};

const BaseSquare: React.FC<BaseSquareProps> = ({ className, number }) => {
  const multipleOfThree = number % 3 === 0 && "disable";
  return (
    <div className={clsx(className, multipleOfThree)}>
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
  &.disable {
    background-color: red;
  }
`;

export default memo<BaseSquareProps>(Square);
