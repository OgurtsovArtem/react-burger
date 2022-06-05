import { Switch, Route } from "react-router-dom";
import AppHeader from "../AppHeader/AppHeader";
import {
  Login,
  BurgerBody,
  Page404,
  Registration,
  ForgotPassword,
  ResetPassword,
  Profile,
} from "../../pages";
import { ProvideAuth } from "../../services/auth";
import { ProtectedRoute } from "../ProtectedRoute";

function App() {
  return (
    <>
      <AppHeader />
      <ProvideAuth>
        <Switch>
          <Route path="/" exact={true}>
            <BurgerBody />
          </Route>
          <Route path="/login" exact={true}>
            <Login />
          </Route>
          <ProtectedRoute path="/register" exact={true}>
            <Registration />
          </ProtectedRoute>
          <ProtectedRoute path="/forgot-password" exact={true}>
            <ForgotPassword />
          </ProtectedRoute>
          <ProtectedRoute path="/reset-password" exact={true}>
            <ResetPassword />
          </ProtectedRoute>
          <Route path="/profile" exact={true}>
            <Profile />
          </Route>
          <ProtectedRoute path="/ingredients/:id" exact={true}></ProtectedRoute>
          <Route path="*">
            <Page404 />
          </Route>
        </Switch>
      </ProvideAuth>
    </>
  );
}

export default App;
