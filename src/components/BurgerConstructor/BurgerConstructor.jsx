import {
  CurrencyIcon,
  Button,
  CloseIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import PropTypes from "prop-types";

import BasketCard from "../BasketCard/BasketCard";
import OrderDetails from "../OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";

import BurgerConstructorStyle from "./BurgerConstructor.module.css";
import ingredientsPropTypes from "../../utils/types";

const BUTTON_STATUS_NAME = {
  desktop: "Оформить заказ",
  mobileClose: "Смотреть заказ",
  mobileOpen: "Заказать",
};

function BurgerConstructor({ data }) {
  const [activeBody, setACtiveBody] = React.useState(false);
  const [mobile, setMobile] = React.useState(window.matchMedia("(max-width: 1035px)").matches);
  const [activePopup, setActivePopup] = React.useState(false);
  const changeBodyStatus = () => {
    setACtiveBody(!activeBody);
  };

  const changePopupStatus = () => {
    setActivePopup(!activePopup);
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
          <OrderDetails />
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
            <button onClick={activeBody ? changeBodyStatus : null}>
              <CloseIcon type="primary" />
            </button>
          </div>
          <BasketCard data={data[0]} isLocked={true} type="top" />

          <div className={`${BurgerConstructorStyle.body} pl-4 pr-4  custom-scrollbar`}>
            {data.slice(2, -1).map((object) => (
              <BasketCard key={object._id} data={object} isLocked={false} type="middle" />
            ))}
          </div>
          <BasketCard data={data[1]} isLocked={true} type="bottom" />
        </div>
        <div className={`${BurgerConstructorStyle.footer} pt-10 pl-4 pr-4`}>
          <div className={`${BurgerConstructorStyle.totalPrice} mr-10`}>
            <span className={`${BurgerConstructorStyle.totalValue} text text_type_digits-medium`}>
              610
            </span>
            <CurrencyIcon type="primary" />
          </div>
          <Button
            type="primary"
            size="medium"
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

BurgerConstructor.propTypes = {
  data: PropTypes.arrayOf(ingredientsPropTypes).isRequired,
};

export default BurgerConstructor;
