import React, { memo } from "react";
import styled from "styled-components";
import Square from "components/atoms/Square";

type BaseNineSquaresProps = {
  className?: string;
  squareStructure?: Array<number>;
  defaultValues?: Array<Array<number>>;
};

const BaseNineSquares: React.FC<BaseNineSquaresProps> = ({
  className,
  squareStructure = [3, 3],
  defaultValues = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
  ],
}) => {
  //   const Squares: Array<Array<JSX.Element>> = [];
  //   for (let i = 0; i < squareStructure[1]; i++) {
  //     const SquaresRow: Array<JSX.Element> = [];
  //     let SquaresRowElement: JSX.Element = <></>;
  //     for (let j = 0; j < squareStructure[0]; j++) {
  //       SquaresRow.push(<Square number={defaultValues[j][i]} />);
  //       SquaresRowElement = <div>{SquaresRow}</div>;
  //     }
  //     Squares.push(SquaresRow);
  //   }

  const SquaresRow: Array<JSX.Element> = [];
  for (let i = 0; i < squareStructure[0]; i++) {
    SquaresRow.push(<Square number={defaultValues[0][i]} key={i} />);
  }

  return (
    <div className={className}>
      <div className={"flex"}>{SquaresRow}</div>
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
    .flex {
      display: flex;
    }
  }
`;

export default memo<BaseNineSquaresProps>(NineSquares);
