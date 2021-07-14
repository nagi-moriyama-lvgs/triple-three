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
    width: 7rem;
    height: 7rem;
    box-sizing: border-box;
    background-color: #27292b;
    border: 5px solid #37383b;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 1.5rem;
    }
  }
  &.disable {
    background-color: #fa8072;
  }
`;

export default memo<BaseSquareProps>(Square);
