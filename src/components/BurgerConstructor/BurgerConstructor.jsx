import {
  CurrencyIcon,
  Button,
  CloseIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import PropTypes from "prop-types";

import BasketCard from "../BasketCard/BasketCard";
import PopupOrder from "../PopupOrder/PopupOrder";

import BurgerConstructorStyle from "./BurgerConstructor.module.css";

function BurgerConstructor({ data }) {
  const [activeBody, setACtiveBody] = React.useState(false);
  const [mobile, setMobile] = React.useState(false);
  const [activePopup, setActivePopup] = React.useState(false);

  const statusWords = {
    desctop: "Оформить заказ",
    mobileClose: "Смотреть заказ",
    mobileOpen: "Заказать",
  };

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

  React.useEffect(() => {
    setMobile(window.matchMedia("(max-width: 1035px)").matches);
  }, []);

  return (
    <>
      {activePopup && <PopupOrder onClick={changePopupStatus} />}

      <div className={`${BurgerConstructorStyle.basket} `}>
        <div
          className={`${
            activeBody ? BurgerConstructorStyle.body_active : BurgerConstructorStyle.body
          } pl-4 pr-4 mt-25 custom-scrollbar`}
        >
          <div className={`${BurgerConstructorStyle.header} pt-4 pb-4 pl-2 pr-2`}>
            <h2 className={`${BurgerConstructorStyle.title} text text_type_main-medium`}>Заказ</h2>
            <button onClick={activeBody ? changeBodyStatus : null}>
              {" "}
              <CloseIcon type="primary" />
            </button>
          </div>
          {data.map((object) => (
            <BasketCard key={object._id} {...object} />
          ))}
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
                ? statusWords.mobileOpen
                : statusWords.mobileClose
              : statusWords.desctop}
          </Button>
        </div>
      </div>
    </>
  );
}

BurgerConstructor.propTypes = {
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

export default BurgerConstructor;
