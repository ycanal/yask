import Tree from "rc-tree";
import { Key } from "rc-tree/lib/interface";
import { useMemo, useState } from "react";

import "rc-tree/assets/index.css";
import { useLocation, useNavigate } from "react-router-dom";
import css from "./Menu.module.scss";

import menu from "menu.json";

type Node = {
  key: string;
  name: string;
  title: string;
  children?: Node[];
};

function mapTree(
  values: any[],
  path: string[] = [],
  acc: { [key: string]: string[] } = {}
): { [key: string]: string[] } {
  if (!values) return acc;
  return values.reduce((a, value) => {
    const p = [...path, value.name];
    return {
      ...mapTree(value.children, p, a),
      [value.key]: p,
    };
  }, acc);
}

type Props = { className?: string };

export default function Menu({ className }: Props) {
  const navigate = useNavigate();
  const location = useLocation();

  const treeMap = useMemo(() => mapTree(menu), menu);
  const [keys, setKeys] = useState<Key[]>(() => {
    let currentTree: Node[] = menu;
    let result: Key[] = [];
    location.pathname
      .split("/")
      .filter(Boolean)
      .forEach((key) => {
        const node = currentTree.find((node) => node.name === key);
        currentTree = node && node.children ? node.children : [];
        result = node ? [node.key] : [];
      });

    return result;
  });

  const handleSelect = (keys: Key[]) => {
    if (keys.length !== 1) setKeys([]);
    const [key] = keys;
    navigate(treeMap[key].join("/"));
    setKeys(keys);
  };

  return (
    <div className={[className, css.container].filter(Boolean).join(" ")}>
      <Tree
        defaultExpandAll
        className={css.tree}
        treeData={menu}
        onSelect={handleSelect}
        selectedKeys={keys}
      />
    </div>
  );
}
