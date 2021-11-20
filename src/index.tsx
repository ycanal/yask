import { Router } from "@remix-run/router";
import * as React from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { getStore } from "modules";
import App from "./App";

import "styles.scss";

const router: Router = createBrowserRouter([{ path: "*", element: <App /> }]);
const store = getStore(router);

const root = createRoot(document.getElementById("root")!);

root.render(
  <React.StrictMode>
    <Provider store={store}>
      <RouterProvider router={router} />
    </Provider>
  </React.StrictMode>
);
