# Atoms

## Square

```
type BaseSquareProps = {
  className?: string;
  number: number;
};
```

- number を描画
- number が 3 の倍数であればエラーデザインを描画

## Adder

```
type BaseAdderProps = {
  className?: string;
  value?: string;
  index?: number;
  onClick?: (event: React.MouseEvent) => void;
};
```

- value を描画

## Button

```
type BaseButtonProps = {
  className?: string;
  buttonText: string;
  disabled?: boolean;
  onClick: () => void;
};
```

- buttonText をボタンのテキストとして描画
- disabled が true なら disable 属性を true に設定

## Score

```
type BaseScoreProps = {
  className?: string;
  label?: string;
  number: number;
};
```

- label と number を描画

# molecules

## NineSquares

```
type BaseNineSquaresProps = {
  className?: string;
  defaultValues?: Array<Array<number>>;
};
```

- 二次元の number 型の配列を受け取り 3x3 の Square を描画

## Hands

```
type BaseHandsProps = {
  className?: string;
  values: [number, number];
  onClick?: () => void;
};
```

- number 型の props をそれぞれ main_hand と sub_hand として描画
- ChangeIcon に onClick を設定

## Adders

```
type BaseAddersProps = {
  className?: string;
  value: string[];
  onClick?: () => void;
}
```

- 逆さ L 字の Adder 6 つを描画
- それぞれの Adder に onClick を設定
