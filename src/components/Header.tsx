import * as React from "react";

import logo from "images/logo.svg";
import css from "./Header.scss";

type HeaderProps = {};

export default function Header({}: HeaderProps) {
  return (
    <div className={css.container}>
      <img className={css.logo} src={logo} />
      YASK
    </div>
  );
}
