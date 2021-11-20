import * as React from "react";
import { Link } from "react-router-dom";

import css from "./Sidebar.scss";

type SidebarProps = {};

export default function Sidebar({}: SidebarProps) {
  return (
    <div className={css.container}>
      <Link to="about">About me</Link>
      <Link to="todo">Todo</Link>
    </div>
  );
}
