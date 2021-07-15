import React, { memo } from "react";
import styled from "styled-components";
import * as CC from "~/consts";

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

export const Hand = memo<BaseHandProps>(styled(BaseHand)`
  & {
    width: ${CC.SIZE * 10}px;
    height: ${CC.SIZE * 10}px;
    border: 3px solid ${CC.COLOR.GRAY};
    display: flex;
    justify-content: center;
    align-items: center;
    span {
      font-size: 1.5rem;
    }
  }
`);
