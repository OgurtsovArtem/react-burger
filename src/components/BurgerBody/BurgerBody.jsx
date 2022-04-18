import BurgerBodyStyle from "./BurgerBody.module.css";

import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
function BurgerBody() {
  return (
    <section className={BurgerBodyStyle.section}>
      <BurgerIngredients />
      <BurgerConstructor />
    </section>
  );
}

export default BurgerBody;
