import * as React from "react";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Header from "components/Header";

import css from "./App.module.scss";

const Settings = React.lazy(() => import("components/Settings"));
const Store = React.lazy(() => import("components/store/Store"));

export default function App() {
  return (
    <div className={css.container}>
      <section aria-label="Header" className={css.header}>
        <Header />
      </section>
      <section aria-label="Content" className={css.content}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/settings" element={<Settings />} />
            <Route path="*" element={<Store />} />
          </Routes>
        </Suspense>
      </section>
    </div>
  );
}
