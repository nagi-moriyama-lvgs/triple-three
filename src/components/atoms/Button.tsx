import React, { memo } from "react";
import styled from "styled-components";
import * as CC from "~/consts";

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

export const Button = memo<BaseButtonProps>(styled(BaseButton)`
  & {
    button {
      width: ${CC.SIZE * 10}px;
      height: ${CC.SIZE * 5}px;
      color: ${CC.COLOR.PRIMARY};
      background-color: ${CC.COLOR.DARKGRAY};
      border: none;
      border-radius: 4px;
      font-weight: bold;
    }
  }
`);
