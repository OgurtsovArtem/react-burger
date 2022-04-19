import React from "react";
import PropTypes from "prop-types";

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsStyle from "./BurgerIngredients.module.css";
import IngredientsCard from "../IngredientsCard/IngredientsCard";

function BurgerIngredients({ data }) {
  const [current, setCurrent] = React.useState("one");
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

      <div className={`${BurgerIngredientsStyle.products} custom-scrollbar`}>
        <div className={`${BurgerIngredientsStyle.chapter}`}>
          <h2 className={`text text_type_main-medium mt-10 mb-6`}>Булки</h2>
          <div className={`${BurgerIngredientsStyle.chapterList} ml-4 mt-6 mr-2`}>
            {data.map((object) => {
              return object.type === "bun" ? (
                <IngredientsCard key={object._id} {...object} />
              ) : null;
            })}
          </div>
          <h2
            className={`${BurgerIngredientsStyle.chapterTitle} text text_type_main-medium mt-10 mb-6`}
          >
            Соусы
          </h2>
          <div className={`${BurgerIngredientsStyle.chapterList} ml-4 mt-6 mr-2`}>
            {data.map((object) => {
              return object.type === "sauce" ? (
                <IngredientsCard key={object._id} {...object} />
              ) : null;
            })}
          </div>
          <h2
            className={`${BurgerIngredientsStyle.chapterTitle} text text_type_main-medium mt-10 mb-6`}
          >
            Основа
          </h2>
          <div className={`${BurgerIngredientsStyle.chapterList} ml-4 mt-6 mr-2 mb-6`}>
            {data.map((object) => {
              return object.type === "main" ? (
                <IngredientsCard key={object._id} {...object} />
              ) : null;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

BurgerIngredients.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      calories: PropTypes.number,
      carbohydrates: PropTypes.number,
      fat: PropTypes.number,
      image: PropTypes.string.isRequired,
      image_large: PropTypes.string,
      image_mobile: PropTypes.string,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      proteins: PropTypes.number,
      type: PropTypes.string.isRequired,
      _id: PropTypes.string.isRequired,
    })
  ),
};

export default BurgerIngredients;
