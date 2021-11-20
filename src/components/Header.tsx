import * as React from "react";
import { Link } from "react-router-dom";

import logo from "images/logo.svg";
import css from "./Header.scss";

type HeaderProps = {};

export default function Header({}: HeaderProps) {
  return (
    <div className={css.topNav}>
      <div className={css.logoContainer}>
        <img className={css.logo} src={logo} />
        YASK
      </div>
      <input id="menu-toggle" type="checkbox" className={css.menuToggle} />
      <label htmlFor="menu-toggle" className={css.menuButtonContainer}>
        <div className={css.menuButton} />
      </label>

      <ul className={css.menu}>
        <li>
          <Link to="about">About me</Link>
        </li>
        <li>
          <Link to="todo">Todo</Link>
        </li>
      </ul>
    </div>
  );
}
