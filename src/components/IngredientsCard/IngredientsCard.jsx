import React from "react";
import IngredientsCardStyle from "./IngredientsCard.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";

import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import ingredientsPropTypes from "../../utils/types";

function IngredientsCard({ data }) {
  const [activePopup, setActivePopup] = React.useState(false);

  const changePopupStatus = () => {
    setActivePopup(!activePopup);
  };
  return (
    <>
      {activePopup && (
        <Modal onClose={changePopupStatus} header={"Детали ингредиента"}>
          <IngredientDetails data={data} />
        </Modal>
      )}
      <div className={IngredientsCardStyle.card} onClick={changePopupStatus}>
        <Counter count={1} size="default" />
        <picture>
          <source media="(min-width: 1024px)" srcSet={data.image_large} />
          <source media="(min-width: 539px)" srcSet={data.image} />
          <img
            className={`${IngredientsCardStyle.image} ml-4 mr-4 mb-1`}
            src={data.image_mobile}
            alt={data.name}
          />
        </picture>
        <div className={`${IngredientsCardStyle.price} mt-1 mb-1`}>
          <span className={`text text_type_digits-default  mr-1`}>{data.price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <h3 className="text text_type_main-default">{data.name}</h3>
      </div>
    </>
  );
}

IngredientsCard.propTypes = {
  data: ingredientsPropTypes.isRequired,
};

export default IngredientsCard;
