import React, { memo } from "react";
import styled from "styled-components";

type BaseHandProps = {
  className?: string;
  value?: number;
};

const BaseHand = React.forwardRef<HTMLDivElement, BaseHandProps>(function (
  { className, value },
  ref
) {
  return (
    <div className={className} ref={ref}>
      <span>+{value}</span>
    </div>
  );
});

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
