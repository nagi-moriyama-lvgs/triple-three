import React, { memo } from "react";
import styled from "styled-components";
import Adder from "~/components/atoms/Adder";

type BaseAddersProps = {
  className?: string;
  addersNumber: number;
  value?: string;
  index?: number;
};

const BaseAdders: React.FC<BaseAddersProps> = ({
  className,
  addersNumber = 3,
  value = "+1",
  index = 1,
}) => {
  return (
    <div className={className}>
      {[...Array(addersNumber)].map((_, i) => (
        <Adder value={value} active={i === index} key={i} />
      ))}
    </div>
  );
};

const Adders = styled(BaseAdders)`
  & {
  }
`;

export default memo<BaseAddersProps>(Adders);
