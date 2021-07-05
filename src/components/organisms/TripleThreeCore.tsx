import React, { memo, useState, useCallback } from "react";
import styled from "styled-components";
import Adder from "~/components/atoms/Adder";
import Hand from "~/components/atoms/Hand";
import Hands from "~/components/molecules/Hands";
import ChangeIcon from "~/components/atoms/ChangeIcon";
import NineSquares from "~/components/molecules/NineSquares";

type BaseTripleThreeCoreProps = {
  className?: string;
};

const BaseTripleThreeCore: React.FC<BaseTripleThreeCoreProps> = ({
  className,
}) => {
  // Adder
  const initializeAdderValues = [...Array(6)].map((_, index) => ({
    index: index,
    value: "",
  }));
  const [adderValues, setAdderValues] = useState(initializeAdderValues);

  // Hands
  const [hands, setHands] = useState(["3", "7"]);
  const changeHands = () => {
    setHands([hands[1], hands[0]]);
    const [{ index }] = adderValues.filter(({ value }) => !!value);
    const newAdderValues = [...Array(6)].map((_, index) => ({
      index,
      value: "",
    }));
    newAdderValues[index].value = `+${hands[1]}`;
    setAdderValues(newAdderValues);
  };

  // adderをクリックした時にvalueを差し替える
  const onClickSelect = useCallback(
    (event) => {
      const newAdderValues = [...Array(6)].map((_, index) => ({
        index: index,
        value: "",
      }));
      newAdderValues[event.currentTarget.dataset.index].value = `+${hands[0]}`;
      setAdderValues(newAdderValues);
    },
    [hands]
  );

  return (
    <div className={className}>
      <div className={"empty_area"}></div>
      <div className={"top_area"}>
        <Adder onClick={onClickSelect} {...adderValues[0]} />
        <Adder onClick={onClickSelect} {...adderValues[1]} />
        <Adder onClick={onClickSelect} {...adderValues[2]} />
      </div>
      <div className={"left_area"}>
        <Adder onClick={onClickSelect} {...adderValues[3]} />
        <Adder onClick={onClickSelect} {...adderValues[4]} />
        <Adder onClick={onClickSelect} {...adderValues[5]} />
      </div>
      <div className={"main_area"}>
        <NineSquares />
      </div>
      <div className={"hand_area"}>
        <Hands values={hands} onClick={changeHands} />
      </div>
    </div>
  );
};

const TripleThreeCore = styled(BaseTripleThreeCore)`
  & {
    display: grid;
    grid-template-rows: 100px 300px 100px;
    grid-template-columns: 100px 300px;
    .empty_area {
      grid-row: 1 / 2;
      grid-column: 1 / 2;
    }
    .top_area {
      grid-row: 1 / 2;
      grid-column: 2 / 3;
      display: flex;
    }
    .left_area {
      grid-row: 2 / 3;
      grid-column: 1 / 2;
    }
    .main_area {
      grid-row: 2 / 3;
      grid-column: 2 / 3;
    }
    .hand_area {
      grid-row: 3 / 4;
      grid-column: 2 / 3;
      display: flex;
      .hand {
        cursor: pointer;
      }
    }
  }
`;

export default memo<BaseTripleThreeCoreProps>(TripleThreeCore);
