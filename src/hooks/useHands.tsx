// Handsを扱うロジック

import { useState } from "react";
import { useRandomNumber } from "~/hooks";

type AdderType = number[];
type handsType = [number, number];
type useHandsType = (
  adders: AdderType,
  setAdders: React.Dispatch<React.SetStateAction<AdderType>>
) => { hands: any; setHands: any; onChangeHands: any; drawNewHand: any };

const localStorageHans = JSON.parse(localStorage.getItem("hands")!);

export const useHands: useHandsType = (adders, setAdders) => {
  const [hands, setHands] = useState<handsType>(
    localStorageHans || [useRandomNumber(), useRandomNumber()]
  );

  const onChangeHands = () => {
    setHands([hands[1], hands[0]]);
    const [adderIndex] = adders.flatMap((v, i) => (v !== 0 ? i : []));
    if (adderIndex) {
      const adderArray = [0, 0, 0, 0, 0, 0];
      adderArray[adderIndex] = hands[1];
      setAdders(adderArray);
    }
  };

  const drawNewHand: () => handsType = () => {
    const newHands: handsType = [hands[1], useRandomNumber()];
    setHands(newHands);
    return newHands;
  };

  return { hands, setHands, onChangeHands, drawNewHand };
};
