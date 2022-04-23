import icon from "../../icons/done_popup.svg";

import OrderDetailsStyle from "./OrderDetails.module.css";

function OrderDetails() {
  return (
    <div className={OrderDetailsStyle.body}>
      <h2 className={`${OrderDetailsStyle.number} text text_type_digits-large`}>034536</h2>
      <h3 className="text text_type_main-default mt-8">идентификатор заказа</h3>
      <img className={`${OrderDetailsStyle.icon} mt-15`} src={icon} alt="done" />
      <p className="text text_type_main-small mt-15">Ваш заказ начали готовить</p>
      <p className="text text_type_main-small text_color_inactive mt-2">
        Дождитесь готовности на орбитальной станции
      </p>
    </div>
  );
}

export default OrderDetails;
