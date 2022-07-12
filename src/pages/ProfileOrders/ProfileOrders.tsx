import { useEffect } from "react";
import { Loader } from "../../components/Loader/Loader";
import OrderCard from "../../components/OrderCard/OrderCard";
import ProfileWrapper from "../../components/ProfileWrapper/ProfileWrapper";
import ScrollWrapper from "../../components/ScrollWrapper/ScrollWrapper";
import { WS_CONNECTION_USER_START, WS_CONNECTION_CLOSED } from "../../services/action-types";
import { useDispatch, useSelector } from "../../services/hooks";
import styles from './ProfileOrders.module.css'

function ProfileOrders() {

  const {data} = useSelector(store => store.ws)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch({ type: WS_CONNECTION_USER_START });
    return(() => {
      dispatch({ type: WS_CONNECTION_CLOSED });
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
          return <OrderCard key={index} data={item}/>
        })}
          </>
      )}

      </ScrollWrapper>
    </ProfileWrapper>
  ) 
}

export default ProfileOrders;
