import { useEffect } from "react";
import { Loader } from "../../components/Loader/Loader";
import OrderCard from "../../components/OrderCard/OrderCard";
import ProfileWrapper from "../../components/ProfileWrapper/ProfileWrapper";
import ScrollWrapper from "../../components/ScrollWrapper/ScrollWrapper";
import { WsConnectionClose, WsConnectionUserStart } from "../../services/actions/wsActions";
import { useDispatch, useSelector } from "../../services/hooks";
import styles from './ProfileOrders.module.css'

function ProfileOrders() {

  const {data} = useSelector(store => store.ws)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(WsConnectionUserStart());
    return(() => {
      dispatch(WsConnectionClose());
    })
  }, [dispatch]);


  return (
    <ProfileWrapper>
      <ScrollWrapper style={styles.wrapper}>

      {!data ? (
        <Loader size="large" />
      ) : (
          <>
        {data.orders.map((item, index)=> {
          return <OrderCard key={index} data={item}  pathname={'/profile/orders/'}/>
        })}
          </>
      )}

      </ScrollWrapper>
    </ProfileWrapper>
  ) 
}

export default ProfileOrders;
