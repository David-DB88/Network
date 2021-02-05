import React from "react";

import { BrowserRouter } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/redux-store";
import AppContainer from "./App";

const MainApp = () => {
  return (
    <BrowserRouter>
      <Provider store={store}>
        <AppContainer />
      </Provider>
    </BrowserRouter>
  );
};

export default MainApp;
