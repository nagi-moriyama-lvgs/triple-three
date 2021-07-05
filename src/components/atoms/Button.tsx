import React, { memo } from "react";
import styled from "styled-components";

type BaseButtonProps = {
  className?: string;
};

const BaseButton: React.FC<BaseButtonProps> = ({ className }) => {
  return (
    <div className={className}>
      <button>Add</button>
    </div>
  );
};

const Button = styled(BaseButton)`
  & {
  }
`;

export default memo<BaseButtonProps>(Button);
