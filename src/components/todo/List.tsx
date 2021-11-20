import { Todo } from "modules/todo";
import * as React from "react";
import { useSelector } from "utils/hooks";

import css from "./List.scss";

type ItemProps = {
  todo: Todo;
};
function Item({ todo }: ItemProps) {
  return (
    <div className={css.item}>
      {todo.title && <h4>{todo.title}</h4>}
      <p>{todo.content}</p>
    </div>
  );
}

type Props = {};
export default function List({}: Props) {
  const todos = useSelector((state) => state.todo.list);
  return (
    <div className={css.list}>
      {todos.map((todo) => (
        <Item key={todo.id} todo={todo} />
      ))}
    </div>
  );
}
