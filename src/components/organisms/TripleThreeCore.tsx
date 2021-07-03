import React, { memo } from "react";
import styled from "styled-components";
import Square from "../atoms/Square";
import NineSquares from "../molecules/NineSquares";

type BaseTripleThreeCoreProps = {
  className?: string;
};

const BaseTripleThreeCore: React.FC<BaseTripleThreeCoreProps> = ({
  className,
}) => {
  return (
    <div className={className}>
      <div className={"empty_area"}></div>
      <div className={"top_area"}>
        <SquareMini />
        <SquareMini />
        <SquareMini />
      </div>
      <div className={"left_area"}>
        <SquareMini />
        <SquareMini />
        <SquareMini />
      </div>
      <div className={"main_area"}>
        <NineSquares />
      </div>
      <div className={"hand_area"}>
        <SquareMini number={0} />
        <SquareMini number={0} />
      </div>
    </div>
  );
};

const SquareMini = styled(Square)`
  & {
    width: 3rem;
    height: 3rem;
    margin-left: 3rem;
  }
`;

const TripleThreeCore = styled(BaseTripleThreeCore)`
  & {
    display: grid;
    grid-template-rows: 100px 300px 100px;
    grid-template-columns: 100px 300px;
    .empty_area {
      grid-row: 1 / 2;
      grid-column: 1 / 2;
    }
    .top_area {
      grid-row: 1 / 2;
      grid-column: 2 / 3;
      display: flex;
    }
    .left_area {
      grid-row: 2 / 3;
      grid-column: 1 / 2;
    }
    .main_area {
      grid-row: 2 / 3;
      grid-column: 2 / 3;
    }
    .hand_area {
      grid-row: 3 / 4;
      grid-column: 2 / 3;
      display: flex;
    }
  }
`;

export default memo<BaseTripleThreeCoreProps>(TripleThreeCore);
