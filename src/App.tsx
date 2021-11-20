import * as React from "react";
import { Suspense } from "react";
import { Route, Routes } from "react-router-dom";

import Footer from "components/Footer";
import Header from "components/Header";
import Sidebar from "components/Sidebar";

import css from "./App.scss";

const About = React.lazy(() => import("components/About"));
const Todo = React.lazy(() => import("components/Todo"));

export default function App() {
  return (
    <div className={css.container}>
      <div className={css.header}>
        <Header />
      </div>
      <div className={css.footer}>
        <Footer />
      </div>
      <div className={css.sidebar}>
        <Sidebar />
      </div>
      <div className={css.content}>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="about" element={<About />} />
            <Route path="todo" element={<Todo />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}
