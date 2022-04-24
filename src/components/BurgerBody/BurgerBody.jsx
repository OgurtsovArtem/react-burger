import PropTypes from "prop-types";
import ingredientsPropTypes from "../../utils/types";

import BurgerBodyStyle from "./BurgerBody.module.css";

import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import Loader from "../Loader/Loader";

function BurgerBody({ state }) {
  return (
    <section className={BurgerBodyStyle.section}>
      {state.success ? (
        <>
          <BurgerIngredients data={state.data} />
          <BurgerConstructor data={state.data} />
        </>
      ) : (
        <Loader />
      )}
    </section>
  );
}

BurgerBody.propTypes = {
  state: PropTypes.shape({
    success: PropTypes.bool.isRequired,
    data: PropTypes.arrayOf(ingredientsPropTypes).isRequired,
  }).isRequired,
};

export default BurgerBody;
