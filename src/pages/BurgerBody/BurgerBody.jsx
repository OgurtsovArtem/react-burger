import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import BurgerBodyStyle from "./BurgerBody.module.css";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../../components/BurgerIngredients/BurgerIngredients";

function BurgerBody() {
  return (
    <section className={BurgerBodyStyle.section}>
      <>
        <DndProvider backend={HTML5Backend}>
          <BurgerIngredients />
          <BurgerConstructor />
        </DndProvider>
      </>
    </section>
  );
}

export default BurgerBody;
