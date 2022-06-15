import { useSelector } from "react-redux";
import { Redirect, Route, useLocation } from "react-router-dom";
import { Loader } from "./Loader/Loader";

export function ProtectedRoute({ onlyUnAuth = false, ...rest }) {
  const { sending, data } = useSelector((store) => store.user);
  const location = useLocation();
  if (sending) {
    return <Loader size="large" />;
  }

  if (onlyUnAuth && data) {
    const { from } = location.state || { from: { pathname: "/" } };
    return <Redirect to={from} />;
  }

  if (!onlyUnAuth && !data) {
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
