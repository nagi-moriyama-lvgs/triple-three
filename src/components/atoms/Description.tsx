import React from "react";
import styled from "styled-components";
import * as CC from "~/consts";

type BaseDescriptionProps = {
  className?: string;
};

const BaseDescription: React.FC<BaseDescriptionProps> = ({ className }) => {
  return (
    <div className={className}>
      <hr color={CC.COLOR.GRAY} />
      <h2>How To Play</h2>
      <ul>
        <li>The score is the sum of nine numbers.</li>
        <li>You can add hand numbers to columns or rows.</li>
        <li>Numbers that are multiples of 3 are not included in the score.</li>
        <li>Game over when the number of multiples of 3 becomes 3 or more.</li>
      </ul>
    </div>
  );
};

export const Description = styled(BaseDescription)`
  & {
    hr {
      width: 100%;
      color: ${CC.COLOR.GRAY};
    }
  }
`;
