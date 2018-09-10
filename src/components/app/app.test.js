import React from "react";
import ReactDOM from "react-dom";
import { testStateMachine } from "react-automata";

import App from ".";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(<App />, div);
  ReactDOM.unmountComponentAtNode(div);
});

const fixtures = {
  initialData: {
    user: {},
    error: "You must supply a name"
  },
  loading: {
    SUCCESS: {
      user: "oliverturner"
    },
    FAILURE: {
      error: "You must supply a name"
    }
  }
};

it("works with a stateMachine", () => {
  testStateMachine(App, fixtures);
});
