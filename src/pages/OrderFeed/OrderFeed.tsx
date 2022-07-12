import OrderList from "../../components/OrderList/OrderList";
import OrderInfo from "../../components/OrderInfo/OrderInfo";
import styles from "./OrderFeed.module.css";
import { useDispatch, useSelector } from "../../services/hooks";
import { Loader } from "../../components/Loader/Loader";
import { useEffect } from "react";
import { WS_CONNECTION_START, WS_CONNECTION_CLOSED } from "../../services/action-types";

function OrderFeed() {
  const {data} = useSelector(store => store.ws)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_START });
    return(() => {
      dispatch({ type: WS_CONNECTION_CLOSED });
    })
  }, [dispatch]);
  
  return (
    <section className={styles.section}>

      {!data ? (
        <Loader size="large" />
      ) : (
          <>
            <OrderList data={data.orders} />
            <OrderInfo  data={data}/>
          </>
      )}

    </section>
  );
}

export default OrderFeed;