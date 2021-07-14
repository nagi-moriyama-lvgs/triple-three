import React, { memo } from "react";
import styled from "styled-components";
import CssConst from "~/consts/CssConst";

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
      color: ${CssConst.COLOR.PRIMARY};
      background-color: ${CssConst.COLOR.DARKGRAY};
      border: none;
      border-radius: 4px;
      outline: none;
      font-weight: bold;
    }
  }
`;

export default memo<BaseButtonProps>(Button);
