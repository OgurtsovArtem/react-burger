import styles from "./FeedModal.module.css";
import { Loader } from "../Loader/Loader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "../../services/hooks";
import { getOrdersFeed } from "../../services/selectors/ingredientSelectors";
import FeedDetails from "../FeedDetails/FeedDetails";


const FeedModal= () => {
  const dispatch = useDispatch()
  const {data}: any = useSelector((state) => state.ws)
  console.log(data)

  useEffect(() => {
    dispatch(getOrdersFeed());
}, [dispatch]);

  if (!data) {
    return  <Loader size="medium" />;
  }

  return <FeedDetails data={data.orders}/>;
}

export default FeedModal;
