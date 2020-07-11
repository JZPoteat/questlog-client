import React from "react";
import ReactDOM from "react-dom";

import NavLink from "../NavLink/NavLink";
import { BrowserRouter } from "react-router-dom";
it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <NavLink />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
