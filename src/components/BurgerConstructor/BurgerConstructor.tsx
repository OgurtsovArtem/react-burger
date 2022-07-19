import {
  CurrencyIcon,
  Button,
  CloseIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { useSelector, useDispatch } from "../../services/hooks";
import BasketCard from "../BasketCard/BasketCard";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";
import { IIngredientsPropTypes } from "../../utils/types";

import BurgerConstructorStyle from "./BurgerConstructor.module.css";
import { useDrop } from "react-dnd";
import { useHistory } from "react-router";
import { ADD_ITEM, INCREASE_ITEM, ADD_BUN } from "../../services/action-types";

declare module "react" {
  interface FunctionComponent<P = {}> {
    (props: PropsWithChildren<P>, context?: any): ReactElement<any, any> | null;
  }
}

const BUTTON_STATUS_NAME = {
  desktop: "Оформить заказ",
  mobileClose: "Смотреть заказ",
  mobileOpen: "Заказать",
};

function BurgerConstructor() {
  const [activeBody, setActiveBody] = React.useState<boolean>(false);
  const [count, setCount] = React.useState<number>(0);
  const [activePopup, setActivePopup] = React.useState<boolean>(false);
  const [mobile, setMobile] = React.useState<boolean>(
    window.matchMedia("(max-width: 1035px)").matches
  );

  const { isAuthCheck } = useSelector((store) => store.user);
  const { addedIngredients, bun } = useSelector((store) => store.ingredients);

  const ingredientsPrice = addedIngredients.reduce((acc, item) => acc + item.price, 0);
  const bunPrice = bun.reduce((acc, item) => acc + item.price * 2, 0);
  const totalPrice = ingredientsPrice + bunPrice;

  const dispatch = useDispatch();
  const history = useHistory();

  const addItem = (item: { id: string }) => {
    setCount((prevCount) => prevCount + 1);
    dispatch({
      type: ADD_ITEM,
      id: item.id,
      index: count,
      uniqId: Math.random().toString(16).slice(2),
    });
    dispatch({ type: INCREASE_ITEM, id: item.id });
  };
  const addBun = (item: { id: string }) => {
    dispatch({ type: ADD_BUN, id: item.id });
  };

  const [, drop] = useDrop({
    accept: "ingredient",
    collect: (monitor) => ({
      isHover: monitor.isOver(),
    }),
    drop(item: any) {
      const type = item.type;
      type === "bun" ? addBun(item) : addItem(item);
    },
  });

  const changeBodyStatus = () => {
    if (isAuthCheck) {
      setActiveBody(!activeBody);
    } else {
      history.replace({ pathname: "/login" });
    }
  };

  const changePopupStatus = () => {
    if (isAuthCheck) {
      setActivePopup(!activePopup);
    } else {
      history.replace({ pathname: "/login" });
    }
  };

  React.useEffect(() => {
    const changeStatus = () => {
      setMobile(window.matchMedia("(max-width: 1035px)").matches);
    };
    window.addEventListener("resize", changeStatus);
    return () => {
      window.removeEventListener("resize", changeStatus);
    };
  });

  return (
    <>
      {activePopup && (
        <Modal onClose={changePopupStatus}>
          <OrderDetails popupStatus={activePopup}/>
        </Modal>
      )}

      <div className={`${BurgerConstructorStyle.basket} `}>
        <div
          className={`${
            activeBody ? BurgerConstructorStyle.wrapper_active : BurgerConstructorStyle.wrapper
          } mt-25`}
        >
          <div className={`${BurgerConstructorStyle.header} pt-4 pb-4 pl-2 pr-2`}>
            <h2 className={`${BurgerConstructorStyle.title} text text_type_main-medium`}>Заказ</h2>
            <button onClick={activeBody ? changeBodyStatus : undefined}>
              <CloseIcon type="primary" />
            </button>
          </div>
          {bun[0] ? <BasketCard data={bun[0]} isLocked={true} type="top" index={1} /> : null}

          <div ref={drop} className={`${BurgerConstructorStyle.body} pl-4 pr-4  custom-scrollbar`}>
            {addedIngredients.map((object: IIngredientsPropTypes, index: number) => (
              <BasketCard
                key={object.uniqId}
                data={object}
                isLocked={false}
                type="middle"
                index={index}
              />
            ))}
          </div>
          {bun[0] ? <BasketCard data={bun[0]} isLocked={true} type="bottom" index={2} /> : null}
        </div>
        <div className={`${BurgerConstructorStyle.footer} pt-10 pl-4 pr-4`}>
          <div className={`${BurgerConstructorStyle.totalPrice} mr-10`}>
            <span className={`${BurgerConstructorStyle.totalValue} text text_type_digits-medium`}>
              {totalPrice ? totalPrice : 0}
            </span>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            type="primary"
            size="medium"
            disabled={!totalPrice}
            onClick={
              mobile ? (!activeBody ? changeBodyStatus : changePopupStatus) : changePopupStatus
            }
          >
            {mobile
              ? activeBody
                ? BUTTON_STATUS_NAME.mobileOpen
                : BUTTON_STATUS_NAME.mobileClose
              : BUTTON_STATUS_NAME.desktop}
          </Button>
        </div>
      </div>
    </>
  );
}

export default BurgerConstructor;
