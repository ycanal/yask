import * as React from "react";
import { Navigate, Route, Routes, useNavigate } from "react-router-dom";

import Create from "./Create";
import List from "./List";

import css from "./Todo.scss";

type Props = {};

export default function Todo({}: Props) {
  const navigate = useNavigate();
  return (
    <div className={css.container}>
      <div className={css.header}>
        <h3>Stuff to do</h3>
        <Routes>
          <Route
            index
            element={
              <div className={css.button} onClick={() => navigate("create")}>
                {"+"}
              </div>
            }
          />
          <Route
            path="create"
            element={
              <div className={css.button} onClick={() => navigate("")}>
                {"<"}
              </div>
            }
          />
        </Routes>
      </div>
      <div className={css.content}>
        <Routes>
          <Route index element={<List />} />
          <Route path="create" element={<Create />} />
          <Route path="*" element={<Navigate to="" replace />} />
        </Routes>
      </div>
    </div>
  );
}
