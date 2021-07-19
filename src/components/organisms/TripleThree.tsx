import React, { memo } from "react";
import styled from "styled-components";
import { Button } from "~/components/atoms";
import { Hands, NineSquares } from "~/components/molecules";
import { useSplitAdders } from "~/hooks";
import * as CC from "~/consts";

export type BaseTripleThreeProps = {
  className?: string;
  adders: number[];
  squares: number[][];
  hands: [number, number];
  buttonDisable: boolean;
  onClickAdder: (event: React.MouseEvent) => void;
  onClickChangeHands: () => void;
  onClickAddButton: () => void;
};

const BaseTripleThree: React.FC<BaseTripleThreeProps> = ({
  className,
  adders,
  squares,
  hands,
  buttonDisable,
  onClickAdder,
  onClickChangeHands,
  onClickAddButton,
}) => {
  const { row_adders, column_adders } = useSplitAdders(adders, onClickAdder);

  return (
    <div className={className}>
      <div className={"row_adders area"}>{row_adders}</div>
      <div className={"column_adders area"}>{column_adders}</div>
      <div className={"nine_squares area"}>
        <NineSquares values={squares} />
      </div>
      <div className={"bottom_area area"}>
        <Hands values={hands} onClick={onClickChangeHands} />
        <Button
          buttonText={"Add"}
          onClick={onClickAddButton}
          disabled={buttonDisable}
        />
      </div>
    </div>
  );
};

export const TripleThree = memo<BaseTripleThreeProps>(styled(BaseTripleThree)`
  & {
    display: grid;
    grid-template-rows:
      ${CC.SIZE * 20}px
      ${CC.SIZE * 50}px
      ${CC.SIZE * 30}px;
    grid-template-columns:
      ${CC.SIZE * 20}px
      ${CC.SIZE * 50}px;

    .area {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .row_adders {
      grid-row: 1 / 2;
      grid-column: 2 / 3;
      padding: 0 ${CC.SIZE * 4}px;
    }

    .column_adders {
      grid-row: 2 / 3;
      grid-column: 1 / 2;
      flex-direction: column;
      padding: ${CC.SIZE * 4}px 0;
    }

    .nine_squares {
      grid-row: 2 / 3;
      grid-column: 2 / 3;
      justify-content: center;
    }

    .bottom_area {
      grid-row: 3 / 4;
      grid-column: 2 / 3;
      padding: ${CC.SIZE * 1}px;
      button {
        height: ${CC.SIZE * 15}px;
      }
    }
  }
`);
