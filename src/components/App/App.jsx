import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import { ProtectedRoute } from "../ProtectedRoute";

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

function App() {
  const history = useHistory();
  const location = useLocation();

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
        <Route path="/ingredients/:id" exact>
          <Ingredient />
        </Route>
        <Route>
          <Page404 />
        </Route>
      </Switch>
      {background && (
        <Route
          path="/ingredients/:id"
          children={
            <Modal onClose={handleModalClose} header={"Детали ингредиента"}>
              <IngredientDetails />
            </Modal>
          }
        />
      )}
    </>
  );
}

export default App;
