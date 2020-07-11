import React from "react";
import ReactDOM from "react-dom";

import GameListItem from "../Games/GameListItem/GameListItem";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  const testProps = {
    params: {
      id: 1,
    },
  };
  ReactDOM.render(
    <BrowserRouter>
      <GameListItem match={testProps} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
