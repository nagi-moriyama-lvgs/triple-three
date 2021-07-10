import React, { memo, useState } from "react";
import styled from "styled-components";
import Hand from "~/components/atoms/Hand";
import ChangeIcon from "../atoms/ChangeIcon";

type BaseHandsProps = {
  className?: string;
  values: [number, number];
};

const BaseHands: React.FC<BaseHandsProps> = ({ className, values }) => {
  const [hands, setHands] = useState<[number, number]>(values);
  const changeHands = () => {
    setHands([hands[1], hands[0]]);
  };
  return (
    <div className={className}>
      <ChangeIcon color={"gray"} onClick={changeHands} />
      <Hand className={"main_hand"} value={values[0]} />
      <Hand className={"sub_hand"} value={values[1]} />
    </div>
  );
};

const Hands = styled(BaseHands)`
  & {
    position: relative;
    width: 9rem;
    height: 8rem;
    .main_hand {
      position: absolute;
      top: 0;
      width: 5rem;
      height: 5rem;
    }
    .sub_hand {
      position: absolute;
      right: 0;
      bottom: 0;
    }
    svg {
      position: absolute;
      top: 1rem;
      right: 1rem;
      width: 2rem;
      height: 2rem;
      cursor: pointer;
    }
  }
`;

export default memo<BaseHandsProps>(Hands);
