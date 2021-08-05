// adderを縦横に分割するロジック
import React from "react";
import { Adder } from "~/components/atoms";
import { BaseTripleThreeProps } from "~/components/organisms/TripleThree";

export const useSplitAdders = (
  adders: BaseTripleThreeProps["adders"],
  onClick: (event: React.MouseEvent) => void
) => {
  const row_adders: JSX.Element[] = [];
  const column_adders: JSX.Element[] = [];

  adders.forEach((adder, index) => {
    const adderElement = (
      <Adder
        value={adder}
        onClick={onClick}
        index={index}
        key={`adder_${index}`}
      />
    );
    if (index <= 2) {
      row_adders.push(adderElement);
    } else {
      column_adders.push(adderElement);
    }
  });

  return { row_adders, column_adders };
};
