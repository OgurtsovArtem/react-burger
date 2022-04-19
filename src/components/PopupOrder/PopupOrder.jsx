import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import icon from "../../icons/done_popup.svg";

import PopupOrderStyle from "./PopupOrder.module.css";

function PopupOrder({ onClick }) {
  return (
    <div className={PopupOrderStyle.popup}>
      <div className={`${PopupOrderStyle.box} pt-30 pb-30 pl-5 pr-5`}>
        <div className={PopupOrderStyle.header}>
          <h3 className={`${PopupOrderStyle.headerTitle} text text_type_main-medium`}>
            Заказ оформлен
          </h3>
          <button className={`${PopupOrderStyle.closeButton} mt-15 mr-15`} onClick={onClick}>
            <CloseIcon type="primary" />
          </button>
        </div>
        <h2 className={`${PopupOrderStyle.number} text text_type_digits-large`}>034536</h2>
        <h3 className="text text_type_main-default mt-8">идентификатор заказа</h3>
        <img className="mt-15" src={icon} alt="done" />
        <p className="text text_type_main-small mt-15">Ваш заказ начали готовить</p>
        <p className="text text_type_main-small text_color_inactive mt-2">
          Дождитесь готовности на орбитальной станции
        </p>
      </div>
    </div>
  );
}

export default PopupOrder;
