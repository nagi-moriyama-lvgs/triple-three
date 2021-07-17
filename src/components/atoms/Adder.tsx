import React from "react";
import styled from "styled-components";
import * as CC from "~/consts";

type BaseAdderProps = {
  className?: string;
  index: number;
  value: number;
  onClick: (event: React.MouseEvent) => void;
};

const BaseAdder: React.FC<BaseAdderProps> = ({
  className,
  index,
  value,
  onClick,
}) => {
  return (
    <div className={className} onClick={onClick} data-index={index}>
      <span>{value === 0 || `+${value}`}</span>
    </div>
  );
};

export const Adder = styled(BaseAdder)`
  & {
    width: ${CC.SIZE * 10}px;
    height: ${CC.SIZE * 10}px;
    background-color: ${CC.COLOR.DARKGRAY};
    border: 3px solid ${CC.COLOR.GRAY};
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;
    span {
      font-size: 1.5rem;
    }
  }
`;
