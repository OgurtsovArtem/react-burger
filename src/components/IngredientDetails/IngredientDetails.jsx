import IngredientDetailsStyle from "./IngredientDetails.module.css";
import ingredientsPropTypes from "../../utils/types";

function IngredientDetails({ data }) {
  return (
    <div className={`${IngredientDetailsStyle.body} `}>
      <img className={IngredientDetailsStyle.image} src={data.image} alt={data.name} />
      <p className="text text_type_main-medium mt-4">{data.name}</p>
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
            {data?.calories ?? "-"}
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
            {data?.proteins ?? "-"}
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
            {data?.fat ?? "-"}
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
            {data?.carbohydrates ?? "-"}
          </span>
        </div>
      </div>
    </div>
  );
}
IngredientDetails.propTypes = {
  data: ingredientsPropTypes.isRequired,
};

export default IngredientDetails;
