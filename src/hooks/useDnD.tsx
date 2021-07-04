import React, { useRef, useState } from "react";

// 座標の型
type Position = {
  x: number;
  y: number;
};

// ドラッグ&ドロップする要素の型
type DnDItem<T> = {
  value: T;              // useDnDSort()の引数に渡された配列の要素の値 
  key: string;           // 要素と紐づいた一意な文字列
  position: Position;    // 要素の座標
  element: HTMLElement;  // DOM情報
};

// useRefで保存するデータの型
type DnDRef<T> = {
  keys: Map<T, string>;            // 要素に紐づいたkey文字列を管理するMap
  receivers: DnDItem<T>[];         // 並び替える全ての要素を保持するための配列
  canCheckHovered: boolean;        // 重なり判定ができるかのフラグ
  pointerPosition: Position;       // マウスポインターの座標
  dragElement: DnDItem<T> | null;  // ドラッグしてる要素
};

// 返り値の型
export type DnDResult<T> = {
  key: string;
  value: T;
  events: {
    ref?: (element: HTMLElement | null) => void;
    onMouseDown?: (event: React.MouseEvent<HTMLElement>) => void;
  };
};

//============== ドラッグ中に対象の要素とマウスが重なっているかの判定 ==============
const isHover = (event: MouseEvent, element: HTMLElement): boolean => {
  // マウスポインターの座標を取得
  const clientX = event.clientX;
  const clientY = event.clientY;
  
  // 重なりを判定する要素のサイズと座標を取得
  const rect = element.getBoundingClientRect();

  // マウスポインターが要素と重なっているかを判定する
  return (
    clientY < rect.bottom &&
    clientY > rect.top &&
    clientX < rect.right &&
    clientX > rect.left
  );
}

//========================================================
//                  メソッド本体
// ========================================================
export const useDnD = <T,>(dragItems: T[], dropItems: T[]): DnDResult<T>[][] => {
  const state = useRef<DnDRef<T>>({
    receivers: [],
    keys: new Map(),
    dragElement: null,
    canCheckHovered: true,
    pointerPosition: { x: 0, y: 0 },
  }).current;

  //============== ドラッグ中の処理 ==============
  const onMouseMove = (event: MouseEvent) => {
    const { clientX, clientY } = event;
    const { receivers, dragElement, pointerPosition } = state;

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

    // ホバー確認できない場合は処理を終了
    if (!state.canCheckHovered) return;

    // ホバー確認不可に変更
    state.canCheckHovered = false;

    // 100ms後に確認できるようにする
    setTimeout(() => (state.canCheckHovered = true), 100);

    // ホバーしているときに背景を赤色に変更
    receivers.forEach((receiver,index) => {
      if(isHover(event, receiver.element)){
        console.log(index);
        receiver.element.style.backgroundColor = 'red';
      }else{
        receiver.element.style.backgroundColor = 'white';
      }
    })
  };

  // =========== ドラッグが終了した時の処理 ==============
  const onMouseUp = (event: MouseEvent) => {
    const { dragElement, receivers } = state;

    // ドラッグしていなかったら何もしない
    if (!dragElement) return;

    // ホバーしている要素のindexを取得する
    const hoveredIndex = receivers.findIndex(
      ({ element }) => isHover(event, element)
    );

    // ホバーした状態でdropしたら受け手のindexを出力
    if (hoveredIndex !== -1) {
      console.log(hoveredIndex);
      console.log(dragElement.value);
      receivers[hoveredIndex].value = dragElement.value;
      receivers[hoveredIndex].element.style.backgroundColor = 'white';
    }

    // ドラッグしてる要素に適用していたCSSを削除
    const dragStyle = dragElement.element.style;
    dragStyle.zIndex = "";
    dragStyle.cursor = "";
    dragStyle.transform = "";

    // ドラッグしている要素をstateから削除
    state.dragElement = null;

    // windowに登録していたイベントを削除
    window.removeEventListener("mouseup", onMouseUp);
    window.removeEventListener("mousemove", onMouseMove);
  };

  // ============== ドラッグする要素を生成 ==============
  const [drags, setDrags] = useState(dragItems);
  const dragResults = drags.map((value: T): DnDResult<T> => {
    const key = state.keys.get(value) || Math.random().toString(16);
    state.keys.set(value, key);
    return {
      value,
      key,
      events: {
        onMouseDown: (event: React.MouseEvent<HTMLElement>) => {
          console.log('click drag item');
          // ドラッグするDOM
          const element = event.currentTarget;

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
          state.dragElement = {key, value, element, position };

          // mousemove, mouseupイベントをwindowに登録する
          window.addEventListener("mouseup", onMouseUp);
          window.addEventListener("mousemove", onMouseMove);
        }
      }
    }
  })

  // ============== ドロップされる要素を生成 ==============
  const [drops, setDrops] = useState(dropItems);
  const dropResults = drops.map((value: T): DnDResult<T> => {
    const key = state.keys.get(value) || Math.random().toString(16);
    state.keys.set(value, key);
    return {
      value,
      key,
      events: {
        ref: (element: HTMLElement | null) => {
          if (!element) return;
          const { receivers } = state;

          // 位置をリセットする
          element.style.transform = "";

          // 要素の位置を取得
          const { left: x, top: y } = element.getBoundingClientRect();
          const position: Position = { x, y };

          const itemIndex = receivers.findIndex((item) => item.key === key);

          // 要素が無ければ新しく追加して処理を終わる
          if (itemIndex === -1) {
            return receivers.push({ key, value, element, position });
          }

          // 要素を更新する
          state.receivers[itemIndex] = { key, value, element, position };
        },
      }
    }
  })

  return [dragResults, dropResults];

};
