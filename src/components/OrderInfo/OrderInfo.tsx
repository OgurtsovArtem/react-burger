import { FC, Key } from 'react';
import { IOrders, IOrder } from '../../utils/types';
import styles from './OrderInfo.module.css'

interface IOrderListProps {
  data: IOrders<IOrder> | any;
}

const OrderInfo: FC<IOrderListProps> = ({data}) => {

  const InWork: IOrder[] = data.orders.slice(0, 20).filter((item: { status: string; }) => item.status === 'pending');
  const Done: IOrder[] =  data.orders.slice(0, 20).filter((item: { status: string; }) => item.status === 'done');

  return (
    <div className={styles.section}>
      <div className={styles.box}>
        <div className={styles.column}>
          <h2 className={`${styles.title} text text_type_main-medium`}>Готовы:</h2>
          <ul className={styles.numbers}>
            {Done.map((item ,index: Key | null | undefined) => {
             return <li className={`${styles.number_accent} text text_type_digits-default`} key={index}>{item.number}</li>
            })}
          </ul>
        </div>
        <div className={styles.column}>
          <h2 className={`${styles.title} text text_type_main-medium`}>В работе:</h2>
          <ul className={styles.numbers}>
            {InWork.map((item ,index: Key | null | undefined) => {
              return <li className={`${styles.number} text text_type_digits-default`} key={index}>{item.number}</li>
              })}
          </ul>
        </div>
      </div>
      <div className={`${styles.all} mt-15`}>
        <h2 className={`${styles.title} text text_type_main-medium`}>Выполнено за все время:</h2>
        <p className={`${styles.value} text text_type_digits-large`}>{data.total}</p>
      </div>
      <div className={`${styles.today} mt-15`}>
        <h2 className={`${styles.title} text text_type_main-medium`}>Выполнено за сегодня:</h2>
        <p className={`${styles.value} text text_type_digits-large`}>{data.totalToday}</p>
      </div>
    </div>

  );
}

export default OrderInfo;