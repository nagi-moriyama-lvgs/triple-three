import React, { memo } from "react";
import styled from "styled-components";
import Square from "~/components/atoms/Square";

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

const NineSquares = styled(BaseNineSquares)`
  & {
    width: 21rem;
    border: 3px solid #37383b;
    .flex {
      display: flex;
    }
  }
`;

export default memo<BaseNineSquaresProps>(NineSquares);
