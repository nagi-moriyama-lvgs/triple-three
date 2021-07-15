import React, { memo } from "react";
import styled from "styled-components";
import * as CC from "~/consts";

type BaseAdderProps = {
  className?: string;
  value?: string;
  index?: number;
  active?: boolean;
  onClick?: (event: React.MouseEvent) => void;
};

const BaseAdder: React.FC<BaseAdderProps> = ({
  className,
  value,
  index,
  onClick,
}) => {
  return (
    <div className={className} onClick={onClick} data-index={index}>
      <span>{value}</span>
    </div>
  );
};

export const Adder = memo<BaseAdderProps>(styled(BaseAdder)`
  & {
    width: ${CC.SIZE * 10}px;
    height: ${CC.SIZE * 10}px;
    border: 3px solid ${CC.COLOR.GRAY};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    span {
      font-size: 2rem;
    }
  }
`);
