import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";

import PopupIngredientsStyle from "./PopupIngredients.module.css";

function PopupIngredients({ onClick, data }) {
  return (
    <div className={PopupIngredientsStyle.popup}>
      <div className={`${PopupIngredientsStyle.box} pt-10 pl-10 pr-10 pb-15`}>
        <div className={PopupIngredientsStyle.header}>
          <h2 className="text text_type_main-large">Детали ингредиента</h2>
          <button onClick={onClick}>
            <CloseIcon type="primary" />
          </button>
        </div>
        <div className={`${PopupIngredientsStyle.body} `}>
          <img className={PopupIngredientsStyle.image} src={data.image} alt={data.name} />
          <p className="text text_type_main-medium mt-4">{data.name}</p>
          <div className={`${PopupIngredientsStyle.specifications}  mt-8`}>
            <div className={PopupIngredientsStyle.column}>
              <p
                className={`${PopupIngredientsStyle.specName} text text_type_main-small text_color_inactive`}
              >
                Калории,ккал
              </p>
              <span
                className={`${PopupIngredientsStyle.specValue} text text_type_main-small text_color_inactive`}
              >
                {data?.calories ?? "-"}
              </span>
            </div>

            <div className={PopupIngredientsStyle.column}>
              <p
                className={`${PopupIngredientsStyle.specName} text text_type_main-small text_color_inactive`}
              >
                Белки, г
              </p>
              <span
                className={`${PopupIngredientsStyle.specValue} text text_type_main-small text_color_inactive`}
              >
                {data?.proteins ?? "-"}
              </span>
            </div>

            <div className={PopupIngredientsStyle.column}>
              <p
                className={`${PopupIngredientsStyle.specName} text text_type_main-small text_color_inactive`}
              >
                Жиры, г
              </p>
              <span
                className={`${PopupIngredientsStyle.specValue} text text_type_main-small text_color_inactive`}
              >
                {data?.fat ?? "-"}
              </span>
            </div>

            <div className={PopupIngredientsStyle.column}>
              <p
                className={`${PopupIngredientsStyle.specName} text text_type_main-small text_color_inactive`}
              >
                Углеводы, г
              </p>
              <span
                className={`${PopupIngredientsStyle.specValue} text text_type_main-small text_color_inactive`}
              >
                {data?.carbohydrates ?? "-"}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PopupIngredients;
