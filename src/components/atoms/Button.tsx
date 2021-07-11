import React, { memo } from "react";
import styled from "styled-components";

type BaseButtonProps = {
  className?: string;
  value: string;
  disabled?: boolean;
  onClick: () => void;
};

const BaseButton: React.FC<BaseButtonProps> = ({
  className,
  value,
  disabled,
  onClick,
}) => {
  return (
    <div className={className} onClick={onClick}>
      <button disabled={disabled}>{value}</button>
    </div>
  );
};

const Button = styled(BaseButton)`
  & {
  }
`;

export default memo<BaseButtonProps>(Button);
