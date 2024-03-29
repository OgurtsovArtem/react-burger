import IngredientDetailsStyle from "./IngredientDetails.module.css";
import { useDispatch, useSelector } from "../../services/hooks";
import { useParams } from "react-router";
import { useEffect } from "react";
import { Loader } from "../Loader/Loader";
import { SET_DETAIL_INGREDIENTS } from "../../services/action-types/ingredientsActionTypes";

function IngredientDetails() {
  const { detailIngredients, allIngredientsRequest, allIngredients } = useSelector(
    (state) => state.ingredients
  );
  const dispatch = useDispatch();
  const { id } = useParams<{ id: string }>();
  useEffect(() => {
    dispatch({ type: SET_DETAIL_INGREDIENTS, _id: id });
  }, [dispatch, id, allIngredients]);

  return (
    <>
      {!allIngredientsRequest && allIngredients && detailIngredients ? (
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
      ) : (
        <Loader size="large" />
      )}
    </>
  );
}

export default IngredientDetails;
