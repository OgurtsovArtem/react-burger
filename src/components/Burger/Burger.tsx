import React from "react";

import burgerStyle from "./Burger.module.css";

function Burger() {
  const [active, setActive] = React.useState(false);
  const burgerStatus = () => {
    setActive(!active);
  };
  return (
    <button
      className={`${burgerStyle.burger} ${active ? burgerStyle.isActive : ""}`}
      onClick={burgerStatus}
    ></button>
  );
}

export default Burger;
