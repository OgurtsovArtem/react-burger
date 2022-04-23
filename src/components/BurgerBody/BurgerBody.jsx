import React from "react";
import BurgerBodyStyle from "./BurgerBody.module.css";

import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import Loader from "../Loader/Loader";

const DATA_URL = "https://norma.nomoreparties.space/api/ingredients";

function BurgerBody() {
  const [state, setState] = React.useState({
    success: false,
    data: [],
  });

  const getData = () => {
    fetch(DATA_URL)
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((data) => {
        setState({ ...state, data: data.data, success: true });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  React.useEffect(() => {
    getData();
  }, []);

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

export default BurgerBody;
