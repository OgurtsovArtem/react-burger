import styles from "./FeedDetails.module.css";
import { Loader } from "../Loader/Loader";
import ScrollWrapper from "../ScrollWrapper/ScrollWrapper";
import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import img from '../../icons/logo_mobile.svg'
import { FC } from "react";
import { useSelector } from "../../services/hooks";
import { getAllMobileImages, getAllNames, getAllPrice, getFeedId, getFinalPrice, getRepetitionsNumbers } from "../../services/selectors/ingredientSelectors";
import { formatDate } from "../../utils/time";
import { useParams } from "react-router-dom";
import { IOrder } from "../../utils/types";

interface IProfileOrderProps {
  data:  Array<IOrder>;
}

const FeedDetails: FC<IProfileOrderProps>= ({data}) => {

  const { id } = useParams<{ id: string }>();
  const currentData = useSelector((state) => getFeedId(state, id, data));
  // Оставляем только уникальные значения в массиве
  const uniqData = Array.from(new Set(currentData.ingredients));

  const images = useSelector((state) => getAllMobileImages(state, uniqData));
  const names = useSelector((state) => getAllNames(state, uniqData));
  const price = useSelector((state) => getAllPrice(state, uniqData));
  const fullPrice = useSelector((state) => getFinalPrice(state, currentData.ingredients));

  const RepetitionsNumbers = useSelector((state) => getRepetitionsNumbers(state, currentData.ingredients));
  const RepetitionsNumbersValue = Object.values(RepetitionsNumbers)

  const statusColor = 'pending' ? styles.status_wait : 'done' ? styles.status_done : styles.status_reject;

  if (!currentData) {
    return  <Loader size="medium" />;
  }

  return (
    <div className={`${styles.body} `}>
        <h2 className={`${styles.title}  text text_type_main-medium mt-10`}>{currentData.name}</h2>
        <p className={`${statusColor}  text text_type_main-small mt-3`}>Выполнен</p>
        <h3 className={`${styles.title}  text text_type_main-medium mt-15 mb-6`}>Состав:</h3>
        <ScrollWrapper style={styles.scroll}>
          {uniqData.map((item: string, index: number) => {
            return(
              <div className={`${styles.item} mb-4`} key={index}>
                <img className={styles.icon} src={images[index] ? images[index]:img} alt="" />
                <h3 className={`${styles.name}  text text_type_main-default`}>{names[index]}</h3>
                <div className={styles.price}>
                  <span className={`${styles.multiplier} text text_type_digits-default`}>{RepetitionsNumbersValue[index]}</span>
                  <span className={`${styles.separator} text text_type_digits-default`}>X</span>
                  <span className={`${styles.value} text text_type_digits-default`}>{price[index]}</span>
                  <CurrencyIcon type="primary" />
                </div>
              </div>
            )
          })}
        </ScrollWrapper>
        <div className={`${styles.footer} mt-10`}>
          <time dateTime={currentData.createdAt} className={`${styles.time} text text_type_main-main text_color_inactive`}>
            {`${formatDate(currentData.createdAt)} i-GMT+3`}
          </time>
          <div className={styles.price}>
            <span className={`${styles.value} text text_type_digits-default`}>{fullPrice}</span>
            <CurrencyIcon type="primary" />
          </div>
        </div>
    </div>
  );
}

export default FeedDetails;
