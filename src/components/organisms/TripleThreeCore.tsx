import React, { memo } from "react";
import styled from "styled-components";
import Square from "components/atoms/Square";
import NineSquares from "components/molecules/NineSquares";

type BaseTripleThreeCoreProps = {
  className?: string;
};

const BaseTripleThreeCore: React.FC<BaseTripleThreeCoreProps> = ({
  className,
}) => {
  return (
    <div className={className}>
      <div className={"row"}>
        <div>
          <Square />
        </div>
      </div>
      <div className={"line flex"}>
        <div>set number area</div>
        <NineSquares />
      </div>
    </div>
  );
};

const TripleThreeCore = styled(BaseTripleThreeCore)`
  & {
    .flex {
      display: flex;
    }
  }
`;

export default memo<BaseTripleThreeCoreProps>(TripleThreeCore);
