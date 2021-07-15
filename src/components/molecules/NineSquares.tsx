import React, { memo } from "react";
import styled from "styled-components";
import { Square } from "~/components/atoms";
import * as CC from "~/consts";

type BaseNineSquaresProps = {
  className?: string;
  defaultValues?: Array<Array<number>>;
};

const BaseNineSquares: React.FC<BaseNineSquaresProps> = ({
  className,
  defaultValues = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ],
}) => {
  const Squares = defaultValues.map((rowArray, i) => (
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
    border: 3px solid ${CC.COLOR.GRAY};
    .flex {
      display: flex;
    }
  }
`);
