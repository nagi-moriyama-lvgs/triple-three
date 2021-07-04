import React, { memo } from "react";
import styled from "styled-components";
import Square from "~/components/atoms/Square";
import NineSquares from "~/components/molecules/NineSquares";
import { useDnD } from "~/hooks/useDnD";

type BaseTripleThreeCoreProps = {
  className?: string;
};

const BaseTripleThreeCore: React.FC<BaseTripleThreeCoreProps> = ({
  className,
}) => {
  const dragList: string[] = ['hand_1', 'hand_2'];
  const dropList: string[] = ['drop_1','drop_2','drop_3','drop_4','drop_5','drop_6'];

  const [dragResults, dropResults] = useDnD(dragList, dropList);

  return (
    <div className={className}>
      <div className={"empty_area"}></div>
      <div className={"top_area"}>
        {dropResults.map((item,index) => (
          <div key={item.value}>
          {index < 3 && 
            <SquareMini number={item.value} {...item.events} />
          }
          </div>
        ))}
      </div>
      <div className={"left_area"}>
      {dropResults.map((item,index) => (
          <div key={item.value}>
          {index >= 3 && 
            <SquareMini number={0} {...item.events} />
          }
          </div>
      ))}
      </div>
      <div className={"main_area"}>
        <NineSquares />
      </div>
      <div className={"hand_area"}>
        {dragResults.map((item) => (
          <div key={item.value}>
            <SquareMini
              number={9}
              className={"hand"}
              {...item.events}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

const SquareMini = styled(Square)`
  & {
    width: 3rem;
    height: 3rem;
    margin-left: 3rem;
  }
`;

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
