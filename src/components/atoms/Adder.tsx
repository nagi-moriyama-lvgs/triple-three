import React, { memo } from "react";
import styled from "styled-components";

type BaseAdderProps = {
  className?: string;
  value?: string;
  index?: number;
  onClick?: (event: React.MouseEvent) => void;
};

const BaseAdder = React.forwardRef<HTMLDivElement, BaseAdderProps>(function (
  { className, value, onClick, index },
  ref
) {
  return (
    <div className={className} ref={ref} onClick={onClick} data-index={index}>
      <span>{value}</span>
    </div>
  );
});

const Adder = styled(BaseAdder)`
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

export default memo<BaseAdderProps>(Adder);