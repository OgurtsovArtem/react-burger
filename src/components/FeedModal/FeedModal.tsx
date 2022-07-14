// import styles from "./FeedModal.module.css";
import { Loader } from "../Loader/Loader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "../../services/hooks";
import { getOrdersFeed } from "../../services/selectors/ingredientSelectors";
import FeedDetails from "../FeedDetails/FeedDetails";
import { useLocation } from "react-router-dom";


const FeedModal= () => {
  const dispatch = useDispatch()
  const {data} = useSelector((state) => state.ws)
  const location: {state: {background: unknown}} = useLocation();

  useEffect(() => {
    if (!location.state?.background) {
      dispatch(getOrdersFeed());
    }
}, [dispatch, location]);

  if (!data) {
    return  <Loader size="medium" />;
  }

  return <FeedDetails data={data.orders}/>;
}

export default FeedModal;
