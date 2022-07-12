import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { ProtectedRoute } from "../ProtectedRoute";
import { Location } from "history";

import AppHeader from "../AppHeader/AppHeader";
import IngredientDetails from "../IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import {
  Login,
  BurgerBody,
  Page404,
  Registration,
  ForgotPassword,
  ResetPassword,
  Profile,
  ProfileOrders,
  Ingredient,
} from "../../pages";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkUserAuth } from "../../services/actions/user";
import { getIngredients } from "../../services/actions/ingredients";
import OrderFeed from "../../pages/OrderFeed/OrderFeed";
import Order from "../../pages/Order/Order";
import FeedModal from "../FeedModal/FeedModal";

function App() {
  const history = useHistory();
  const location = useLocation<{ background: Location }>();
  const dispatch: any = useDispatch();

  useEffect(() => {
    dispatch(getIngredients());
    dispatch(checkUserAuth());
  }, [dispatch]);

  const background = location.state && location.state.background;
  const handleModalClose = () => history.goBack();

  return (
    <>
      <AppHeader />
      <Switch location={background || location}>
        <Route path="/" exact>
          <BurgerBody />
        </Route>
        <ProtectedRoute onlyUnAuth={true} path="/login" exact>
          <Login />
        </ProtectedRoute>
        <ProtectedRoute onlyUnAuth={true} path="/register" exact>
          <Registration />
        </ProtectedRoute>
        <ProtectedRoute onlyUnAuth={true} path="/forgot-password" exact>
          <ForgotPassword />
        </ProtectedRoute>
        <ProtectedRoute onlyUnAuth={true} path="/reset-password" exact>
          <ResetPassword />
        </ProtectedRoute>
        <ProtectedRoute path="/profile" exact>
          <Profile />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders" exact>
          <ProfileOrders />
        </ProtectedRoute>
        <ProtectedRoute path="/profile/orders/:id" exact>
          <Order />
        </ProtectedRoute>
        <Route path="/orders" exact>
          <OrderFeed />
        </Route>
        <Route path="/feed/:id" exact>
          <Order />
        </Route>
        <Route path="/ingredients/:id" exact>
          <Ingredient />
        </Route>
        <Route>
          <Page404 />
        </Route>
      </Switch>
      {background && (
        <>
          <Route
            path="/ingredients/:id"
            children={
              <Modal onClose={handleModalClose} header={"Детали ингредиента"}>
                <IngredientDetails />
              </Modal>
            }
          />
          <Route
          path="/feed/:id"
          children={
            <Modal onClose={handleModalClose} header={"#231455"}>
              <FeedModal />
            </Modal>
          }
          />
          <Route
          path="/profile/orders/:id"
          children={
            <Modal onClose={handleModalClose} header={"#231455"}>
              <FeedModal />
            </Modal>
          }
          />
        </>
      )}

    </>
  );
}

export default App;
