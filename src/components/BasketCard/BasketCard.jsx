import React from "react";
import { DeleteIcon, LockIcon, DragIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import BasketCardStyle from "./BasketCard.module.css";

function BasketCard(props) {
  const [status, setStatus] = React.useState(false);
  return (
    <div className={BasketCardStyle.card}>
      <DragIcon type="primary" />
      <div className={BasketCardStyle.info}>
        <img className={BasketCardStyle.image} src={props.image} alt={props.name} />
        <p className={BasketCardStyle.name}>{props.name}</p>
        <div className={BasketCardStyle.price}>
          <span className={BasketCardStyle.value}>{props.price}</span>
          {status ? <DeleteIcon type="primary" /> : <LockIcon type="primary" />}
        </div>
      </div>
    </div>
  );
}

export default BasketCard;
