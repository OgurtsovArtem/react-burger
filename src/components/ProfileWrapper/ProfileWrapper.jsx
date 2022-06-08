import style from "./ProfileWrapper.module.css";
import { NavLink, useLocation, useHistory, useRouteMatch } from "react-router-dom";

function ProfileWrapper({ children }) {
  return (
    <div className={style.profile}>
      <nav className={style.nav}>
        <ul className={style.list}>
          <li className={`${style.item} text text_type_main-medium`}>
            <NavLink to="/profile" className={style.link} activeClassName={style.activeLink} exact>
              Профиль
            </NavLink>
          </li>
          <li className={`${style.item} text text_type_main-medium`}>
            <NavLink
              to="/profile/orders"
              className={style.link}
              activeClassName={style.activeLink}
              exact
            >
              История заказов
            </NavLink>
          </li>
          <li className={`${style.item} text text_type_main-medium`}>
            <button className={style.logout}>Выход</button>
          </li>
        </ul>
        <p className={`${style.footnote} mt-20 text text_type_main-default text_color_inactive`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <div className={style.content}>{children}</div>
    </div>
  );
}

export default ProfileWrapper;
