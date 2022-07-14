import { CurrencyIcon } from '@ya.praktikum/react-developer-burger-ui-components';
import { FC, Key } from 'react';
import styles from './OrderCard.module.css';

import img from '../../icons/logo_mobile.svg'
import { Link, useLocation } from 'react-router-dom';
import { formatDate } from '../../utils/time';
import { getAllMobileImages, getFinalPrice } from '../../services/selectors/ingredientSelectors';
import { useSelector } from '../../services/hooks';
import { IOrder } from '../../utils/types';

interface IProfileOrderProps {
  data: IOrder;
  pathname: string;
}

const OrderCard: FC<IProfileOrderProps> = ({data, pathname}) => {

  const location = useLocation();
  const {createdAt, ingredients,name, number, status, _id} = data;
  const images = useSelector((state) => getAllMobileImages(state, ingredients));
  const price = useSelector((state) => getFinalPrice(state, ingredients));

  const statusColor = 'pending' === status ? styles.status_wait : 'done' === status ? styles.status_done : styles.status_reject;
  const statusText = 'pending' === status ? "Готовится" : 'done' === status ? "Выполнен" : "Отменён";
  const countImages = ingredients.length > 6 ? `+${ingredients.length - 6}` : '';

  return (
    <Link to={{ pathname: `${pathname}${_id}`, state: { background: location } }}>
      <div className={`${styles.card} pt-6 pb-6 pl-6 pr-6 mb-4`}>
        <div className={`${styles.info} mb-6`}>
          <p className={`${styles.number} text text_type_digits-default`}>#{number}</p>
          <time dateTime={createdAt} className={`${styles.time} text text_type_main-default text_color_inactive`}>
            {`${formatDate(createdAt)} i-GMT+3`}
          </time>
        </div>
        <h2 className={`${styles.title} text text_type_main-medium mb-2`}>{name}</h2>
        <p className={`${statusColor} text text_type_main-default mb-6`}>{statusText}</p>
        <div className={styles.body}>
          <div className={styles.icons}>
            {images.slice(0, 6).map((item: string, index: Key | null | undefined) => {
              return(
                <div className={styles.icon_wrapper}  key={index} data-count={`${countImages}`}>
                  <img className={styles.icon} src={item? item : img} alt="icon" />
                </div>
              )
            })}
          </div>
          <div className={styles.price}>
            <span className={`${styles.value} text text_type_digits-default`}>{price}</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
      </div>
    </Link>
  );
}

export default OrderCard;