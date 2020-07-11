import React from "react";
import ReactDOM from "react-dom";

import ExpandedReview from "../Reviews/ExpandedReview/ExpandedReview";
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
      <ExpandedReview match={testProps} />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
