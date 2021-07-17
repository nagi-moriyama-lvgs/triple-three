import React, { memo } from "react";
import styled from "styled-components";
import { Square } from "~/components/atoms";
import * as CC from "~/consts";

type BaseNineSquaresProps = {
  className?: string;
  values?: Array<Array<number>>;
};

const BaseNineSquares: React.FC<BaseNineSquaresProps> = ({
  className,
  values = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ],
}) => {
  const Squares = values.map((rowArray, i) => (
    <div className={"flex"} key={i}>
      {rowArray.map((squareNumber, j) => (
        <Square number={squareNumber} key={`${i}-${j}`} />
      ))}
    </div>
  ));

  return <div className={className}>{Squares}</div>;
};

export const NineSquares = memo<BaseNineSquaresProps>(styled(BaseNineSquares)`
  & {
    width: ${CC.SIZE * 45}px;
    height: ${CC.SIZE * 45}px;
    border: 10px solid ${CC.COLOR.GRAY};
    .flex {
      display: flex;
    }
  }
`);
