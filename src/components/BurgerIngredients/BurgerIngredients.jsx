import React, { useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsStyle from "./BurgerIngredients.module.css";
import IngredientsCard from "../IngredientsCard/IngredientsCard";
import { getIngredients } from "../../services/actions/ingredients";
import { Loader } from "../Loader/Loader";

function BurgerIngredients() {
  const [current, setCurrent] = React.useState("one");
  const { allIngredients, allIngredientsRequest } = useSelector((state) => state.ingredients);
  const tabsRef = useRef(null);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getIngredients());
  }, [dispatch]);

  const scroll = (e) => {
    if (tabsRef.current) {
      const scrollTo = tabsRef.current.querySelectorAll("[data-scroll-to]");
      const topContainer = tabsRef.current.getBoundingClientRect().top;

      scrollTo.forEach((element) => {
        const topItem = element.getBoundingClientRect().top;
        if (topItem - topContainer < topContainer) {
          const visible = element.getAttribute("data-scroll-to");
          setCurrent(visible);
        }
      });
    }
  };

  const filteredArray = React.useMemo(() => {
    const main = [];
    const bun = [];
    const sauce = [];
    allIngredients.map((object) => {
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
  }, [allIngredients]);

  return (
    <div>
      <h1 className={`${BurgerIngredientsStyle.title} text text_type_main-large pt-5 pb-5 mt-5`}>
        Соберите бургер
      </h1>

      <div className={BurgerIngredientsStyle.tabs}>
        <div data-scroll-from="bun">
          <Tab value="one" active={current === "one"} onClick={setCurrent}>
            Булки
          </Tab>
        </div>
        <div data-scroll-from="sauce">
          <Tab value="two" active={current === "two"} onClick={setCurrent}>
            Соусы
          </Tab>
        </div>
        <div data-scroll-from="main">
          <Tab value="three" active={current === "three"} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
      </div>
      {allIngredientsRequest ? (
        <Loader size="large" />
      ) : (
        <div
          ref={tabsRef}
          onWheel={scroll}
          className={`${BurgerIngredientsStyle.products} custom-scrollbar mt-10`}
        >
          <div className={`${BurgerIngredientsStyle.chapter}`}>
            <h2 className={`text text_type_main-medium  mb-6`} data-scroll-to="one">
              Булки
            </h2>
            <div className={`${BurgerIngredientsStyle.chapterList} ml-4 mt-6 mr-2`}>
              {filteredArray.bun.map((object) => {
                return <IngredientsCard key={object._id} data={object} />;
              })}
            </div>
            <h2
              className={`${BurgerIngredientsStyle.chapterTitle} text text_type_main-medium mt-10 mb-6`}
              data-scroll-to="two"
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
              data-scroll-to="three"
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
      )}
    </div>
  );
}

export default BurgerIngredients;
