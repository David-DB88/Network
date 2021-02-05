// import React from "react";
// import { render } from "@testing-library/react";
// import MainApp from "./MainApp";
// test("renders learn react link", () => {
//   const { getByText } = render(<MainApp />);
//   const linkElement = getByText(/learn react/i);
//   expect(linkElement).toBeInTheDocument();
// });

import React from "react";
import MainApp from "./MainApp";
import ReactDOM from "react-dom";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<MainApp />, div);
  ReactDOM.unmountComponentAtNode(div);
});
