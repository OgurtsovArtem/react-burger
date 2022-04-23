import clsx from "clsx";
import {
  DeleteIcon,
  LockIcon,
  DragIcon,
  CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import BasketCardStyle from "./BasketCard.module.css";

function BasketCard({ isLocked, data, type }) {
  const { name, image_mobile, price, handleClose } = data;

  const className = clsx(BasketCardStyle.info, {
    [BasketCardStyle.info_top]: type === "top",
    [BasketCardStyle.info_middle]: type === "middle",
    [BasketCardStyle.info_bottom]: type === "bottom",
  });

  return (
    <div className={`${BasketCardStyle.card} mb-4 mr-2`}>
      {type === "middle" ? (
        <button>
          <DragIcon type="primary" />
        </button>
      ) : null}

      <div className={`${className} pt-4 pb-4 pl-6 pr-8`}>
        <img className={BasketCardStyle.image} src={image_mobile} alt={name} />
        <p className={`${BasketCardStyle.name} text text_type_main-default`}>{name}</p>
        <div className={BasketCardStyle.price}>
          <span className={`${BasketCardStyle.value} text text_type_digits-default`}>{price}</span>
          <CurrencyIcon type="primary" />
        </div>
        <button className={BasketCardStyle.statusButton}>
          {isLocked ? (
            <LockIcon type="primary" />
          ) : (
            <DeleteIcon type="primary" onClick={handleClose} />
          )}
        </button>
      </div>
    </div>
  );
}

export default BasketCard;
