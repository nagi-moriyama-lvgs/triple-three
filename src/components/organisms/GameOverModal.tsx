import React, { useState } from "react";
import { ClickAwayListener } from "@material-ui/core";
import { Button } from "~/components/atoms";
import clsx from "clsx";
import styled from "styled-components";
import * as CC from "~/consts";

type BaseGameOverModalProps = {
  className?: string;
  score: number;
  open: boolean;
  setState: (_: boolean) => void;
  onClick: () => void;
};

const BaseGameOverModal: React.FC<BaseGameOverModalProps> = ({
  className,
  score,
  open,
  setState,
  onClick,
}) => {
  console.log(`open is ${open}`);
  return (
    <>
      {open && (
        <div className={className}>
          <ClickAwayListener onClickAway={() => setState(false)}>
            <div className={"modal"}>
              <h1>Game Over</h1>
              <p>
                Your score is
                <span> {score}</span>
              </p>
              <div className={"buttons"}>
                <Button buttonText={"BACK"} onClick={() => setState(false)} />
                <Button
                  buttonText={"NEW GAME"}
                  onClick={() => {
                    setState(false);
                    onClick();
                  }}
                />
              </div>
            </div>
          </ClickAwayListener>
        </div>
      )}
    </>
  );
};

export const GameOverModal = styled(BaseGameOverModal)`
  & {
    width: 100vw;
    height: 100vh;
    position: fixed;
    z-index: 9999;
    background-color: ${CC.COLOR.MODAL_BACK};
    backdrop-filter: blur(5px);
    display: flex;
    justify-content: center;
    align-items: center;

    .modal {
      width: ${CC.SIZE * 70}px;
      height: ${CC.SIZE * 30}px;
      background-color: ${CC.COLOR.GRAY};
      border-radius: ${CC.SIZE * 1}px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
      padding: ${CC.SIZE * 5}px 0;

      span {
        color: ${CC.COLOR.PRIMARY};
        font-size: ${CC.SIZE * 5}px;
      }

      .buttons {
        display: flex;
        button {
          width: ${CC.SIZE * 20}px;
          margin: ${CC.SIZE * 1}px;
        }
      }
    }
  }
`;
