import * as React from "react";

type TodoProps = {};

export default function Todo({}: TodoProps) {
  return (
    <ul>
      <li>faire la vaisselle</li>
      <li>nettoyer la caisse des chats</li>
    </ul>
  );
}
