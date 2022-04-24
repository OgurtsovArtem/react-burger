import React from "react";
import PropTypes from "prop-types";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsStyle from "./BurgerIngredients.module.css";
import IngredientsCard from "../IngredientsCard/IngredientsCard";
import ingredientsPropTypes from "../../utils/types";

function BurgerIngredients({ data }) {
  const [current, setCurrent] = React.useState("one");

  const filteredArray = React.useMemo(() => {
    const main = [];
    const bun = [];
    const sauce = [];

    data.map((object) => {
      if (object.type === "main") {
        main.push(object);
      }
      if (object.type === "sauce") {
        sauce.push(object);
      }
      if (object.type === "bun") {
        bun.push(object);
      }
      return object;
    });

    return {
      main: main,
      bun: bun,
      sauce: sauce,
    };
  }, [data]);

  return (
    <div>
      <h1 className={`${BurgerIngredientsStyle.title} text text_type_main-large pt-5 pb-5 mt-5`}>
        Соберите бургер
      </h1>

      <div className={BurgerIngredientsStyle.tabs}>
        <Tab value="one" active={current === "one"} onClick={setCurrent}>
          Булки
        </Tab>
        <Tab value="two" active={current === "two"} onClick={setCurrent}>
          Соусы
        </Tab>
        <Tab value="three" active={current === "three"} onClick={setCurrent}>
          Начинки
        </Tab>
      </div>

      <div className={`${BurgerIngredientsStyle.products} custom-scrollbar mt-10`}>
        <div className={`${BurgerIngredientsStyle.chapter}`}>
          <h2 className={`text text_type_main-medium  mb-6`}>Булки</h2>
          <div className={`${BurgerIngredientsStyle.chapterList} ml-4 mt-6 mr-2`}>
            {filteredArray.bun.map((object) => {
              return <IngredientsCard key={object._id} data={object} />;
            })}
          </div>
          <h2
            className={`${BurgerIngredientsStyle.chapterTitle} text text_type_main-medium mt-10 mb-6`}
          >
            Соусы
          </h2>
          <div className={`${BurgerIngredientsStyle.chapterList} ml-4 mt-6 mr-2`}>
            {filteredArray.sauce.map((object) => {
              return <IngredientsCard key={object._id} data={object} />;
            })}
          </div>
          <h2
            className={`${BurgerIngredientsStyle.chapterTitle} text text_type_main-medium mt-10 mb-6`}
          >
            Основа
          </h2>
          <div className={`${BurgerIngredientsStyle.chapterList} ml-4 mt-6 mr-2 mb-6`}>
            {filteredArray.main.map((object) => {
              return <IngredientsCard key={object._id} data={object} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(ingredientsPropTypes).isRequired,
};

export default BurgerIngredients;
