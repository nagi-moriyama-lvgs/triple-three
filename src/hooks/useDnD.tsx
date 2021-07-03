import React, { useRef, useState } from "react";

// 座標の型
type Position = {
  x: number;
  y: number;
};

// ドラッグ&ドロップする要素の型
type DnDItem<T> = {
  value?: T;
  position: Position;
  element: HTMLElement;
};

// useRefで保存するデータの型
type DnDRef<T> = {
  dndItem?: DnDItem<T>;
  canCheckHoverd: boolean;
  pointerPosition: Position;
  dragElement: DnDItem<T> | null;
};

// 返り値の型
export type DnDResult<T> = {
  value?: T;
  events: {
    ref: (element: HTMLElement | null) => void;
    onMouseDown: (event: React.MouseEvent<HTMLElement>) => void;
    onClick?: () => void;
  };
};

export const useDnD = <T,>(defaultItem: T[]): DnDResult<T>[] => {
  const state = useRef<DnDRef<T>>({
    dndItem: undefined,
    dragElement: null,
    canCheckHoverd: true,
    pointerPosition: { x: 0, y: 0 },
  }).current;

  // ドラッグ中の処理
  const onMouseMove = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    const { dragElement, pointerPosition } = state;

    // ドラッグして無ければ何もしない
    if (!dragElement) return;

    // マウスポインターの移動量を計算
    const x = clientX - pointerPosition.x;
    const y = clientY - pointerPosition.y;

    const dragStyle = dragElement.element.style;

    // ドラッグ要素の座標とスタイルを更新
    dragStyle.zIndex = "100";
    dragStyle.cursor = "grabbing";
    dragStyle.transform = `translate(${x}px,${y}px)`;
  };

  // ドラッグが終了した時の処理
  const onMouseUp = (event: MouseEvent) => {
    const { dragElement } = state;

    // ドラッグしていなかったら何もしない
    if (!dragElement) return;

    const dragStyle = dragElement.element.style;

    // ドラッグしてる要素に適用していたCSSを削除
    dragStyle.zIndex = "";
    dragStyle.cursor = "";
    dragStyle.transform = "";

    // ドラッグしている要素をstateから削除
    state.dragElement = null;

    // windowに登録していたイベントを削除
    window.removeEventListener("mouseup", onMouseUp);
    window.removeEventListener("mousemove", onMouseMove);
  };

  const [items, setItems] = useState(defaultItem);
  return items.map((value: T): DnDResult<T> => {
    return {
      value,
      events: {
        ref: () => void 0,
        onMouseDown: (event: React.MouseEvent<HTMLElement>) => {
          console.log(`click hand ${value}`);
          const element = event.currentTarget; // ドラッグするDOM

          // マウスポインターの座標を保持
          state.pointerPosition.x = event.clientX;
          state.pointerPosition.y = event.clientY;

          // ドラッグしている要素のスタイルを上書き
          element.style.transition = ""; // アニメーションを無効にする
          element.style.cursor = "grabbing"; // カーソルのデザインを変更

          // 要素の座標を取得
          const { left: x, top: y } = element.getBoundingClientRect();
          const position: Position = { x, y };

          // ドラッグする要素を保持しておく
          state.dragElement = { value, element, position };

          // mousemove, mouseupイベントをwindowに登録する
          window.addEventListener("mouseup", onMouseUp);
          window.addEventListener("mousemove", onMouseMove);
        },
        // onClick: () => {
        //   console.log("hello world");
        // },
      },
    };
  });
};
