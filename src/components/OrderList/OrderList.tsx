import { FC, Key } from "react";
import OrderCard from "../../components/OrderCard/OrderCard";
import ScrollWrapper from "../../components/ScrollWrapper/ScrollWrapper";
import { IOrder } from "../../utils/types";
import styles from './OrderList.module.css'

interface IOrderListProps {
  data: IOrder[] ;
}

const OrderList: FC<IOrderListProps> = (data) => {
  return (
      <ScrollWrapper style={styles.wrapper}>
        {data.data.map((item, index: Key | null | undefined)=> {
          return <OrderCard key={index} data={item} pathname={'/feed/'}/>
        })}
      </ScrollWrapper>
  ) 
}

export default OrderList;
