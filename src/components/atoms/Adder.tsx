import React, { memo } from "react";
import styled from "styled-components";

type BaseSquareProps = {
  className?: string;
  value?: string;
  index?: number;
  onClick?: (event: React.MouseEvent) => void;
};

const BaseSquare = React.forwardRef<HTMLDivElement, BaseSquareProps>(function (
  { className, value, onClick, index },
  ref
) {
  return (
    <div className={className} ref={ref} onClick={onClick} data-index={index}>
      <span>{value}</span>
    </div>
  );
});

const Square = styled(BaseSquare)`
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

export default memo<BaseSquareProps>(Square);
