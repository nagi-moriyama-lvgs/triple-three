import React, { memo, useState } from "react";
import styled from "styled-components";
import { Hand, ChangeIcon } from "~/components/atoms";
import * as CC from "~/consts";

type BaseHandsProps = {
  className?: string;
  values: [number, number];
  onClick?: () => void;
};

const BaseHands: React.FC<BaseHandsProps> = ({
  className,
  values,
  onClick,
}) => {
  return (
    <div className={className}>
      <ChangeIcon color={"gray"} onClick={onClick} />
      <Hand className={"main_hand"} value={values[0]} />
      <Hand className={"sub_hand"} value={values[1]} />
    </div>
  );
};

export const Hands = memo<BaseHandsProps>(styled(BaseHands)`
  & {
    position: relative;
    width: ${CC.SIZE * 20}px;
    height: ${CC.SIZE * 20}px;
    .main_hand {
      position: absolute;
      top: 0;
      width: ${CC.SIZE * 10}px;
      height: ${CC.SIZE * 10}px;
    }
    .sub_hand {
      position: absolute;
      right: 0;
      bottom: 0;
      width: ${CC.SIZE * 7}px;
      height: ${CC.SIZE * 7}px;
    }
    svg {
      position: absolute;
      top: ${CC.SIZE * 3}px;
      right: ${CC.SIZE * 2}px;
      width: ${CC.SIZE * 5}px;
      height: ${CC.SIZE * 5}px;
      cursor: pointer;
    }
  }
`);
