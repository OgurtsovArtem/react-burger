import React from "react";
import PropTypes from "prop-types";

import burgerStyle from "./Burger.module.css";

interface IBurgerProps {
  onClick: () => void;
  menuActive: boolean;
}

function Burger({ onClick, menuActive }: IBurgerProps) {
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
