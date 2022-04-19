import React from "react";
import IngredientsCardStyle from "./IngredientsCard.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import PopupIngredients from "../PopupIngredients/PopupIngredients";

function IngredientsCard(props) {
  const [activePopup, setActivePopup] = React.useState(false);
  const changePopupStatus = () => {
    setActivePopup(!activePopup);
  };
  return (
    <>
      {activePopup && <PopupIngredients onClick={changePopupStatus} data={props} />}
      <div className={IngredientsCardStyle.card} onClick={changePopupStatus}>
        <Counter count={1} size="default" />
        <picture>
          <source media="(min-width: 1024px)" srcSet={props.image_large} />
          <source media="(min-width: 539px)" srcSet={props.image} />
          <img
            className={`${IngredientsCardStyle.image} ml-4 mr-4 mb-1`}
            src={props.image_mobile}
            alt={props.name}
          />
        </picture>
        <div className={`${IngredientsCardStyle.price} mt-1 mb-1`}>
          <span className={`text text_type_digits-default  mr-1`}>{props.price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <h3 className={`'text text_type_main-default'`}>{props.name}</h3>
      </div>
    </>
  );
}

export default IngredientsCard;
