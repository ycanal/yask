import * as React from "react";
import { Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";

import Header from "components/Header";

import css from "./App.scss";

const About = React.lazy(() => import("components/About"));
const Todo = React.lazy(() => import("components/todo/Todo"));

export default function App() {
  return (
    <div className={css.container}>
      <section aria-label="Header" className={css.header}>
        <Header />
      </section>
      <section aria-label="Content" className={css.content}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/about" element={<About />} />
            <Route path="/todo/*" element={<Todo />} />
            <Route path="*" element={<Navigate to="/about" replace />} />
          </Routes>
        </Suspense>
      </section>
    </div>
  );
}
