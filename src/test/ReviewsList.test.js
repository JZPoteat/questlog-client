import React from "react";
import ReactDOM from "react-dom";

import ReviewsList from "../Reviews/ReviewsList/ReviewsList";
import { BrowserRouter } from "react-router-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <ReviewsList />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
