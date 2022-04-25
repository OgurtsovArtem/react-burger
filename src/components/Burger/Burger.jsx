import React from "react";
import PropTypes from "prop-types";

import burgerStyle from "./Burger.module.css";

function Burger({ onClick, menuActive }) {
  return (
    <button
      className={`${menuActive ? burgerStyle.burger_active : burgerStyle.burger}`}
      onClick={onClick}
    ></button>
  );
}
Burger.propTypes = {
  onClick: PropTypes.func.isRequired,
  menuActive: PropTypes.bool.isRequired,
};

export default Burger;
