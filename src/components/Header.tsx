import { IoCogOutline } from "react-icons/io5";
import { Link, useLocation } from "react-router-dom";

import logo from "images/logo.svg";
import css from "./Header.module.scss";

type HeaderProps = {};

export default function Header({}: HeaderProps) {
  const location = useLocation();

  return (
    <div className={css.topNav}>
      <Link to="/" className={css.logoContainer}>
        <img className={css.logo} src={logo} />
        YASK
      </Link>
      <Link to="/settings">
        <IoCogOutline
          color={location.pathname.match("/settings") ? "#32caca" : "white"}
          size={30}
        />
      </Link>
    </div>
  );
}
