import { Switch, Route, useHistory, useLocation } from "react-router-dom";
import AppHeader from "../AppHeader/AppHeader";
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
import { ProvideAuth } from "../../services/auth";
import { ProtectedRoute } from "../ProtectedRoute";
import { useEffect } from "react";
import { useDispatch } from "react-redux";

function App() {
  const dispatch = useDispatch();
  const history = useHistory();
  const location = useLocation();

  const background = location.state && location.state.background;
  const handleModalClose = () => history.goBack();

  // useEffect(() => {
  //   dispatch()
  // }, [dispatch])
  return (
    <>
      <AppHeader />
      <ProvideAuth>
        <Switch location={background || location}>
          <Route path="/ingredients" exact>
            <BurgerBody />
          </Route>
          <ProtectedRoute path="/login" exact>
            <Login />
          </ProtectedRoute>
          <ProtectedRoute path="/register" exact>
            <Registration />
          </ProtectedRoute>
          <ProtectedRoute path="/forgot-password" exact>
            <ForgotPassword />
          </ProtectedRoute>
          <ProtectedRoute path="/reset-password" exact>
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
      </ProvideAuth>
    </>
  );
}

export default App;
