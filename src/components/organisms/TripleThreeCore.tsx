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
      <div className={"row"}>
        <div className={"space"}></div>
        <div className={"flex"}>
          <SquareMini />
          <SquareMini />
          <SquareMini />
        </div>
      </div>
      <div className={"line flex"}>
        <div>set number area</div>
        <NineSquares />
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
    .row {
      display: flex;
      .space {
        width: 5rem;
      }
      flex {
      }
    }
    .flex {
      display: flex;
    }
  }
`;

export default memo<BaseTripleThreeCoreProps>(TripleThreeCore);
