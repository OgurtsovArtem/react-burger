import React from "react";
import PropTypes from "prop-types";

import burgerStyle from "./Burger.module.css";

function Burger(onClick, active) {
  return (
    <button
      className={`${burgerStyle.burger} ${active ? burgerStyle.isActive : ""}`}
      onClick={onClick}
    ></button>
  );
}
Burger.propTypes = {
  changeStatus: PropTypes.func,
  active: PropTypes.bool,
};

export default Burger;
