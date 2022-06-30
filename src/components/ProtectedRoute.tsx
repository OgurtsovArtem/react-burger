import { useSelector } from "react-redux";
import { Redirect, Route, useLocation, RouteProps } from "react-router-dom";
import { Loader } from "./Loader/Loader";

type TProtectedRoute = {
  onlyUnAuth?: boolean;
} & RouteProps;

export function ProtectedRoute({ onlyUnAuth = false, ...rest }: TProtectedRoute) {
  const { sending, data } = useSelector((store: any) => store.user);
  const location = useLocation<{ from: Location }>();
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
