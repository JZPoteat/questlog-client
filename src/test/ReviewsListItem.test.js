import React from "react";
import ReactDOM from "react-dom";

import ReviewsListItem from "../Reviews/ReviewsListItem/ReviewsListItem";
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
      <ReviewsListItem
        match={testProps}
        date_created="2016-06-23T02:10:25.000Z"
      />
    </BrowserRouter>,
    div
  );
  ReactDOM.unmountComponentAtNode(div);
});
