import IngredientDetailsStyle from "./IngredientDetails.module.css";
import { useSelector } from "react-redux";

function IngredientDetails() {
  const { detailIngredients } = useSelector((state) => state.ingredients);

  return (
    <div className={`${IngredientDetailsStyle.body} `}>
      <img
        className={IngredientDetailsStyle.image}
        src={detailIngredients.image}
        alt={detailIngredients.name}
      />
      <p className="text text_type_main-medium mt-4">{detailIngredients.name}</p>
      <div className={`${IngredientDetailsStyle.specifications}  mt-8`}>
        <div className={IngredientDetailsStyle.column}>
          <p
            className={`${IngredientDetailsStyle.specName} text text_type_main-small text_color_inactive`}
          >
            Калории,ккал
          </p>
          <span
            className={`${IngredientDetailsStyle.specValue} text text_type_main-small text_color_inactive`}
          >
            {detailIngredients?.calories ?? "-"}
          </span>
        </div>

        <div className={IngredientDetailsStyle.column}>
          <p
            className={`${IngredientDetailsStyle.specName} text text_type_main-small text_color_inactive`}
          >
            Белки, г
          </p>
          <span
            className={`${IngredientDetailsStyle.specValue} text text_type_main-small text_color_inactive`}
          >
            {detailIngredients?.proteins ?? "-"}
          </span>
        </div>

        <div className={IngredientDetailsStyle.column}>
          <p
            className={`${IngredientDetailsStyle.specName} text text_type_main-small text_color_inactive`}
          >
            Жиры, г
          </p>
          <span
            className={`${IngredientDetailsStyle.specValue} text text_type_main-small text_color_inactive`}
          >
            {detailIngredients?.fat ?? "-"}
          </span>
        </div>

        <div className={IngredientDetailsStyle.column}>
          <p
            className={`${IngredientDetailsStyle.specName} text text_type_main-small text_color_inactive`}
          >
            Углеводы, г
          </p>
          <span
            className={`${IngredientDetailsStyle.specValue} text text_type_main-small text_color_inactive`}
          >
            {detailIngredients?.carbohydrates ?? "-"}
          </span>
        </div>
      </div>
    </div>
  );
}

export default IngredientDetails;
