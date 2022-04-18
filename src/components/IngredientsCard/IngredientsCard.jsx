import IngredientsCardStyle from "./IngredientsCard.module.css";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";

function IngredientsCard(props) {
  return (
    <div className={IngredientsCardStyle.card}>
      <picture className={`${IngredientsCardStyle.image} ml-4 mr-4 mb-1`}>
        <source media="(min-width: 1024px)" srcSet={props.image_large} />
        <source media="(min-width: 539px)" srcSet={props.image} />
        <img src={props.image_mobile} alt={props.name} />
      </picture>
      <div className={`${IngredientsCardStyle.price} mt-1 mb-1`}>
        <span className={`${IngredientsCardStyle.price} text text_type_digits-default`}>
          {props.price}
        </span>
        <CurrencyIcon type="primary" />
      </div>
      <h3 className={`${IngredientsCardStyle.name} 'text text_type_main-default'`}>{props.name}</h3>
    </div>
  );
}

export default IngredientsCard;
