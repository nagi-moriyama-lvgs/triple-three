import React, { memo } from "react";
import styled from "styled-components";

type BaseButtonProps = {
  className?: string;
  disabled?: boolean;
  onClick: () => void;
};

const BaseButton: React.FC<BaseButtonProps> = ({
  className,
  disabled,
  onClick,
}) => {
  return (
    <div className={className} onClick={onClick}>
      <button disabled={disabled}>Add</button>
    </div>
  );
};

const Button = styled(BaseButton)`
  & {
  }
`;

export default memo<BaseButtonProps>(Button);
