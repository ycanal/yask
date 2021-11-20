import * as React from "react";
import { useState } from "react";

import { create } from "modules/todo";

import { useDispatch } from "utils/hooks";
import css from "./Create.scss";

type Props = {};
export default function Create({}: Props) {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  return (
    <form
      className={css.container}
      onSubmit={(event) => {
        event.preventDefault();
        dispatch(create({ title, content }));
      }}
    >
      <label htmlFor="title">Title</label>
      <input
        type="text"
        id="title"
        onChange={(event) => setTitle(event.target.value)}
        placeholder="A nice title"
      />
      <label htmlFor="task">Task</label>
      <input
        type="text"
        id="task"
        onChange={(event) => setContent(event.target.value)}
        placeholder="An awful task"
      />
      <input type="submit" value="Create" />
    </form>
  );
}
