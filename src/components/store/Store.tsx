import Menu from "./Menu";

import css from "./Store.module.scss";

export default function Store() {
  return (
    <div className={css.container}>
      <Menu className={css.menu} />
    </div>
  );
}
