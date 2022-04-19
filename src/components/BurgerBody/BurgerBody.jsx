import BurgerBodyStyle from "./BurgerBody.module.css";

import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";

import data from "../../utils/data.json";

function BurgerBody() {
  return (
    <section className={BurgerBodyStyle.section}>
      <BurgerIngredients data={data} />
      <BurgerConstructor data={data} />
    </section>
  );
}

export default BurgerBody;
