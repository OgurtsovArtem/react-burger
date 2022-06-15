import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
  ArrowDownIcon,
  ArrowUpIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import React from "react";

import Burger from "../Burger/Burger";

import { Link, NavLink } from "react-router-dom";

import appHeaderStyles from "./AppHeader.module.css";

import mobileLogo from "../../icons/logo_mobile.svg";
import { useSelector } from "react-redux";

function AppHeader() {
  const { isAuthCheck, data } = useSelector((store) => store.user);
  const [menuActive, setMenuActive] = React.useState(false);
  const [listActive, setListActive] = React.useState(false);

  const navBarStatus = () => {
    setMenuActive(!menuActive);
  };

  const listStatus = () => {
    setListActive(!listActive);
  };

  return (
    <header className={`${appHeaderStyles.header}  pr-5 mt-4 mb-4`}>
      <div className={`${appHeaderStyles.container}`}>
        <img className={appHeaderStyles.mobileLogo} src={mobileLogo} alt="stellar-burgers" />
        <nav className={`${menuActive ? appHeaderStyles.nav_active : appHeaderStyles.nav}`}>
          <ul className={appHeaderStyles.list}>
            <li className={`${appHeaderStyles.itemMobile}  pl-5 pr-5`} onClick={listStatus}>
              <ProfileIcon type="secondary" />
              <p className="text text_type_main-default pl-2">
                {isAuthCheck ? data?.name || data?.user?.name : "Личный кабинет"}
              </p>
              {listActive ? <ArrowDownIcon type="secondary" /> : <ArrowUpIcon type="secondary" />}
              <ul className={listActive ? appHeaderStyles.subList : appHeaderStyles.subList_active}>
                <li className={appHeaderStyles.subItem}>
                  <NavLink
                    className={appHeaderStyles.link}
                    activeClassName={appHeaderStyles.activeLink}
                    exact
                    to="/profile"
                  >
                    Профиль
                  </NavLink>
                </li>
                <li className={appHeaderStyles.subItem}>
                  <NavLink
                    className={appHeaderStyles.link}
                    activeClassName={appHeaderStyles.activeLink}
                    exact
                    to="/profile/orders"
                  >
                    История заказов
                  </NavLink>
                </li>
                <li className={appHeaderStyles.subItem}>
                  <p>Выход</p>
                </li>
              </ul>
            </li>
            <li className={`${appHeaderStyles.item_active} pl-5 pr-5`}>
              <NavLink
                className={appHeaderStyles.link}
                activeClassName={appHeaderStyles.activeLink}
                exact
                to="/"
              >
                <BurgerIcon type="secondary" />
                <p className="text text_type_main-default pl-2">Конструктор</p>
              </NavLink>
            </li>
            <li className={`${appHeaderStyles.item}  pl-5 pr-5`}>
              <NavLink
                className={appHeaderStyles.link}
                activeClassName={appHeaderStyles.activeLink}
                exact
                to="/orders"
              >
                <ListIcon type="secondary" />
                <p className="text text_type_main-default pl-2">Лента заказов</p>
              </NavLink>
            </li>
          </ul>
        </nav>
        <Link className={appHeaderStyles.logo} to="/">
          <Logo />
        </Link>
        <button className={appHeaderStyles.admin}>
          <NavLink
            className={appHeaderStyles.link}
            activeClassName={appHeaderStyles.activeLink}
            exact
            to="/profile"
          >
            <ProfileIcon type="secondary" />
            <p className="text text_type_main-default pl-2">
              {isAuthCheck ? data?.name || data?.user?.name : "Личный кабинет"}
            </p>
          </NavLink>
        </button>
        <Burger onClick={navBarStatus} menuActive={menuActive} />
      </div>
    </header>
  );
}

export default AppHeader;
