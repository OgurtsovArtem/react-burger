import { FC, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { CLEAR_ORDER, getOrder } from "../../services/actions/constructor";
import { Loader } from "../Loader/Loader";
import icon from "../../icons/done_popup.svg";
import OrderDetailsStyle from "./OrderDetails.module.css";

interface IOrderDetailsProps {
  popupStatus: boolean;
}

const OrderDetails: FC<IOrderDetailsProps> = ({ popupStatus }) => {
  const { orderStatus, orderLoader } = useSelector((state: any) => state.constructorBurger);
  const dispatch: any = useDispatch();
  useEffect(() => {
    if (popupStatus) {
      dispatch(getOrder());
    }
    return () => {
      dispatch({ type: CLEAR_ORDER });
    };
  }, [popupStatus, dispatch]);

  return (
    <>
      {orderLoader ? (
        <Loader size="large" />
      ) : (
        <div className={OrderDetailsStyle.body}>
          <h2 className={`${OrderDetailsStyle.number} text text_type_digits-large`}>
            {orderStatus.order.number}
          </h2>
          <h3 className="text text_type_main-default mt-8">идентификатор заказа</h3>
          <img className={`${OrderDetailsStyle.icon} mt-15`} src={icon} alt="done" />
          <p className="text text_type_main-small mt-15">Ваш заказ начали готовить</p>
          <p className="text text_type_main-small text_color_inactive mt-2">
            Дождитесь готовности на орбитальной станции
          </p>
        </div>
      )}
    </>
  );
};

export default OrderDetails;
