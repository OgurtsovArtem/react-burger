import React from "react";
import {
  DeleteIcon,
  LockIcon,
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BasketCardStyle from "./BasketCard.module.css";

function BasketCard(props) {
  const [status, setStatus] = React.useState(true);

  const changeStatus = () => {
    setStatus(!status);
  };

  return (
    <div className={`${BasketCardStyle.card} mb-4 mr-2`}>
      <button>
        <DragIcon type="primary" />
      </button>
      <div className={`${BasketCardStyle.info} pt-4 pb-4 pl-6 pr-8`}>
        <img className={BasketCardStyle.image} src={props.image_mobile} alt={props.name} />
        <p className={`${BasketCardStyle.name} text text_type_main-default`}>{props.name}</p>
        <div className={BasketCardStyle.price}>
          <span className={`${BasketCardStyle.value} text text_type_digits-default`}>
            {props.price}
          </span>
          <CurrencyIcon type="primary" />
        </div>
        <button className={BasketCardStyle.statusButton}>
          {status ? <DeleteIcon type="primary" /> : <LockIcon type="primary" />}
        </button>
      </div>
    </div>
  );
}

export default BasketCard;
