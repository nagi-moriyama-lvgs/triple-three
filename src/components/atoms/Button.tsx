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
    button {
      width: 5rem;
      height: 2rem;
      color: #7fffd4;
      background-color: #27292b;
      border: none;
      border-radius: 4px;
      outline: none;
      font-weight: bold;
    }
  }
`;

export default memo<BaseButtonProps>(Button);
