import React, { memo } from "react";
import styled from "styled-components";

type BaseButtonProps = {
  className?: string;
  onClick: () => void;
};

const BaseButton: React.FC<BaseButtonProps> = ({ className, onClick }) => {
  return (
    <div className={className} onClick={onClick}>
      <button>Add</button>
    </div>
  );
};

const Button = styled(BaseButton)`
  & {
  }
`;

export default memo<BaseButtonProps>(Button);
