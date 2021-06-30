import React from "react";
import Square from "./components/atoms/Square";
import NineSquares from "./components/molecules/NineSquares";

const App = () => {
  return (
    <>
      <h1>hello world</h1>
      <Square number={1} />
      <NineSquares />
    </>
  );
};

export default App;
