import React from "react";
import styled from "styled-components";
import clsx from "clsx";
import * as CC from "~/consts";

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

export const Square = styled(BaseSquare)`
  & {
    width: ${CC.SIZE * 15}px;
    height: ${CC.SIZE * 15}px;
    box-sizing: border-box;
    background-color: ${CC.COLOR.DARKGRAY};
    border: 5px solid ${CC.COLOR.GRAY};
    display: flex;
    justify-content: center;
    align-items: center;

    span {
      font-size: 1.5rem;
    }
  }
  &.disable {
    background-color: ${CC.COLOR.ERROR};
  }
`;
