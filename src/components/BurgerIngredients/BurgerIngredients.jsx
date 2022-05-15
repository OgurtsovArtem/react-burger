import { InView } from "react-intersection-observer";
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
        <div>
          <Tab value="one" active={current === "one"} onClick={setCurrent}>
            Булки
          </Tab>
        </div>
        <div>
          <Tab value="two" active={current === "two"} onClick={setCurrent}>
            Соусы
          </Tab>
        </div>
        <div>
          <Tab value="three" active={current === "three"} onClick={setCurrent}>
            Начинки
          </Tab>
        </div>
      </div>
      {allIngredientsRequest ? (
        <Loader size="large" />
      ) : (
        <div ref={tabsRef} className={`${BurgerIngredientsStyle.products} custom-scrollbar mt-10`}>
          <div className={`${BurgerIngredientsStyle.chapter}`}>
            <InView
              as="div"
              onChange={(inView, entry) => {
                if (inView) {
                  setCurrent("one");
                }
              }}
            >
              <h2 className={`text text_type_main-medium  mb-6`}>Булки</h2>
              <div className={`${BurgerIngredientsStyle.chapterList} ml-4 mt-6 mr-2`}>
                {filteredArray.bun.map((object) => {
                  return <IngredientsCard key={object._id} data={object} />;
                })}
              </div>
            </InView>
            <InView
              as="div"
              onChange={(inView, entry) => {
                if (inView) {
                  setCurrent("two");
                }
              }}
            >
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
            </InView>

            <InView
              as="div"
              rootMargin="100px"
              onChange={(inView, entry) => {
                if (inView) {
                  setCurrent("three");
                }
              }}
            >
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
            </InView>
          </div>
        </div>
      )}
    </div>
  );
}

export default BurgerIngredients;
