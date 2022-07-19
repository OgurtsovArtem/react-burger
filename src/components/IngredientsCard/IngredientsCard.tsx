import React, { FC } from "react";
import IngredientsCardStyle from "./IngredientsCard.module.css";
import { CurrencyIcon, Counter } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch } from "../../services/hooks";
import { useDrag } from "react-dnd";
import { Link, useLocation } from "react-router-dom";
import { IIngredientsPropTypes } from "../../utils/types";
import { DELETE_DETAIL_INGREDIENTS } from "../../services/action-types/ingredientsActionTypes";

interface IIngredientsCardProps {
  data: IIngredientsPropTypes;
}

const IngredientsCard: FC<IIngredientsCardProps> = ({ data }) => {
  const [activePopup, setActivePopup] = React.useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const [, dragRef] = useDrag({
    type: "ingredient",
    item: { id: data._id, type: data.type },
  });
  const changePopupStatus = () => {
    setActivePopup(!activePopup);
    if (activePopup) {
      dispatch({ type: DELETE_DETAIL_INGREDIENTS });
    }
  };
  return (
    <Link to={{ pathname: `/ingredients/${data._id}`, state: { background: location } }}>
      <div ref={dragRef} className={IngredientsCardStyle.card} onClick={changePopupStatus}>
        {data?.qty ? <Counter count={data.qty} size="default" /> : null}

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
    </Link>
  );
};

export default IngredientsCard;
