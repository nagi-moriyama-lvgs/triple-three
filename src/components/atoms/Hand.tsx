import React, { memo } from "react";
import styled from "styled-components";

type BaseHandProps = {
  className?: string;
  value?: number;
};

const BaseHand: React.FC<BaseHandProps> = ({ className, value }) => {
  return (
    <div className={className}>
      <span>+{value}</span>
    </div>
  );
};

const Hand = styled(BaseHand)`
  & {
    width: 3rem;
    height: 3rem;
    border: 1px solid lightgray;
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 2rem;
    }
  }
`;

export default memo<BaseHandProps>(Hand);
