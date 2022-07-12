import React from "react";
import { useInView } from "react-intersection-observer";
import { useSelector } from "../../services/hooks";
import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerIngredientsStyle from "./BurgerIngredients.module.css";
import IngredientsCard from "../IngredientsCard/IngredientsCard";
import { Loader } from "../Loader/Loader";
import { IIngredientsPropTypes } from "../../utils/types";

function BurgerIngredients() {
  const [current, setCurrent] = React.useState("buns");
  const { allIngredients, allIngredientsRequest } = useSelector(
    (state) => state.ingredients
  );
  const [bunsRef, inViewBuns] = useInView({
    threshold: 0,
  });
  const [mainsRef, inViewMain] = useInView({
    threshold: 0,
  });
  const [sausesRef, inViewSauses] = useInView({
    threshold: 0,
  });

  React.useEffect(() => {
    if (inViewBuns) {
      setCurrent("buns");
    } else if (inViewSauses) {
      setCurrent("sauces");
    } else if (inViewMain) {
      setCurrent("mains");
    }
  }, [inViewBuns, inViewMain, inViewSauses]);

  const onTabClick = (tab: string) => {
    setCurrent(tab);
    const element = document.getElementById(tab);
    if (element) element.scrollIntoView({ behavior: "smooth" });
  };

  const filteredArray = React.useMemo(() => {
    const main: Array<IIngredientsPropTypes> = [];
    const bun: Array<IIngredientsPropTypes> = [];
    const sauce: Array<IIngredientsPropTypes> = [];

    allIngredients.map((object: IIngredientsPropTypes) => {
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
          <Tab value="buns" active={current === "buns"} onClick={onTabClick}>
            Булки
          </Tab>
        </div>
        <div>
          <Tab value="sauces" active={current === "sauces"} onClick={onTabClick}>
            Соусы
          </Tab>
        </div>
        <div>
          <Tab value="mains" active={current === "mains"} onClick={onTabClick}>
            Начинки
          </Tab>
        </div>
      </div>
      {(!allIngredientsRequest as any) & allIngredients as any ? (
        <Loader size="large" />
      ) : (
        <div className={`${BurgerIngredientsStyle.products} custom-scrollbar mt-10`}>
          <div className={`${BurgerIngredientsStyle.chapter}`}>
            <div ref={bunsRef} id="buns">
              <h2 className={`text text_type_main-medium  mb-6`}>Булки</h2>
              <div className={`${BurgerIngredientsStyle.chapterList} ml-4 mt-6 mr-2`}>
                {filteredArray.bun.map((object) => {
                  return <IngredientsCard key={object._id} data={object} />;
                })}
              </div>
            </div>
            <div ref={sausesRef} id="sauces">
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
            </div>

            <div ref={mainsRef} id="mains">
              <h2
                className={`${BurgerIngredientsStyle.chapterTitle} text text_type_main-medium mt-10 mb-6`}
              >
                Начинки
              </h2>
              <div className={`${BurgerIngredientsStyle.chapterList} ml-4 mt-6 mr-2 mb-6`}>
                {filteredArray.main.map((object) => {
                  return <IngredientsCard key={object._id} data={object} />;
                })}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default BurgerIngredients;
