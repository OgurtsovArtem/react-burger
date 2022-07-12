import { FC, Key } from "react";
import OrderCard from "../../components/OrderCard/OrderCard";
import ScrollWrapper from "../../components/ScrollWrapper/ScrollWrapper";
import { IOrders, IOrder } from "../../utils/types";
import styles from './OrderList.module.css'

interface IOrderListProps {
  data: IOrders<IOrder> | any;
}

const OrderList: FC<IOrderListProps> = (data: any) => {
  return (
      <ScrollWrapper style={styles.wrapper}>
        {data.data.map((item: any, index: Key | null | undefined)=> {
          return <OrderCard key={index} data={item}/>
        })}
      </ScrollWrapper>
  ) 
}

export default OrderList;
