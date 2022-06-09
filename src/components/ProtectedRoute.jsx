import { Redirect, Route, useLocation } from "react-router-dom";
import { Loader } from "./Loader/Loader";

export function ProtectedRoute({ onlyUnAuth = false, ...rest }) {
  const isAuthChecked = true; //useSelector((state) => state.user.isAutchChecked)
  const user = false; //useSelector((state) => state.user.data);
  const location = useLocation();

  if (!isAuthChecked) {
    console.log("dsad");
    return <Loader size="large" />;
  }

  if (onlyUnAuth && user) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Redirect to={from} />;
  }

  if (!onlyUnAuth && !user) {
    return (
      <Redirect
        to={{
          pathname: "/login",
          state: { from: location },
        }}
      />
    );
  }

  return <Route {...rest} />;
}
