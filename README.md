# setup

```
mkdir minimal-react-ts-webpack
cd minimal-react-ts-webpack
git init
npm init -y
npm install react react-dom @types/react @types/react-dom
npm install --save-dev typescript ts-loader webpack webpack-cli

touch tsconfig.json
touch webpack.config.js
touch index.html
mkdir src
touch src/App.tsx
touch src/index.tsx
```

```
npm install --save-dev styled-components @types/styled-components
```

#　各コンポーネントの責務

## Square

```
type BaseSquareProps = {
  className?: string;
  number: number;
};
```

・props で渡された数値を描画。
・props で渡された数値が 3 の倍数であればエラーデザインを描画

## NineSquare

・Square を 9 つ正方形に描画

## Adder

・クリックされたら props で渡された値を描画
