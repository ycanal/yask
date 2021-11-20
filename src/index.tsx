import * as React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { unstable_HistoryRouter as Router } from "react-router-dom";

import { history, store } from "modules";
import App from "./App";

import "styles.scss";

const root = createRoot(document.getElementById("root"));

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <Router history={history}>
        <App />
      </Router>
    </Provider>
  </React.StrictMode>
);
