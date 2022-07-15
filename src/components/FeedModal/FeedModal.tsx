// import styles from "./FeedModal.module.css";
import { Loader } from "../Loader/Loader";
import { useEffect } from "react";
import { useDispatch, useSelector } from "../../services/hooks";
import FeedDetails from "../FeedDetails/FeedDetails";
import { useLocation, useRouteMatch } from "react-router-dom";
import { WsConnectionUserStart, WsConnectionClose, WsConnectionStart } from "../../services/actions/wsActions";


const FeedModal= () => {
  const dispatch = useDispatch()
  const {data} = useSelector((state) => state.ws)
  const {path}= useRouteMatch();

  const location: {state: {background: unknown}} = useLocation();

  useEffect(() => {
    if (!location.state?.background) {

      if(path === '/profile/orders/:id') {
        dispatch(WsConnectionUserStart());
      } else {
        dispatch(WsConnectionStart());
      } 

      return(() => {
        dispatch(WsConnectionClose());
      })
    }
}, [dispatch, location, path]);

  if (!data) {
    return  <Loader size="medium" />;
  }

  return <FeedDetails data={data.orders}/>;
}

export default FeedModal;
