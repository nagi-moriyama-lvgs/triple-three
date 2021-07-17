import React from "react";
import styled from "styled-components";
import * as CC from "~/consts";

type BaseButtonProps = {
  className?: string;
  buttonText: string;
  disabled?: boolean;
  onClick: () => void;
};

const BaseButton: React.FC<BaseButtonProps> = ({
  className,
  buttonText,
  disabled,
  onClick,
}) => {
  return (
    <div className={className} onClick={onClick}>
      <button disabled={disabled}>{buttonText}</button>
    </div>
  );
};

export const Button = styled(BaseButton)`
  & {
    button {
      width: ${CC.SIZE * 15}px;
      height: ${CC.SIZE * 7}px;
      color: ${CC.COLOR.PRIMARY};
      background-color: ${CC.COLOR.DARKGRAY};
      border: none;
      border-radius: 4px;
      font-weight: bold;
    }
  }
`;
