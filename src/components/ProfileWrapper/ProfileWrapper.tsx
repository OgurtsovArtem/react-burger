import style from "./ProfileWrapper.module.css";
import { NavLink } from "react-router-dom";
import { signOut } from "../../services/actions/user";
import { useDispatch } from "../../services/hooks";
import { FC } from "react";

interface IProfileWrapperProps {
  children?: React.ReactNode;
}

const ProfileWrapper: FC<IProfileWrapperProps> = ({ children }) => {
  const dispatch: any = useDispatch();
  const logout = () => {
    dispatch(signOut());
  };
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
            <button className={style.logout} onClick={logout}>
              Выход
            </button>
          </li>
        </ul>
        <p className={`${style.footnote} mt-20 text text_type_main-default text_color_inactive`}>
          В этом разделе вы можете изменить свои персональные данные
        </p>
      </nav>
      <div className={style.content}>{children}</div>
    </div>
  );
};

export default ProfileWrapper;
