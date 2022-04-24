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

import appHeaderStyles from "./AppHeader.module.css";

import mobileLogo from "../../icons/logo_mobile.svg";

function AppHeader() {
  const [menuActive, setMenuActive] = React.useState(false);
  const [listActive, setListActive] = React.useState(false);

  const navBarStatus = () => {
    setMenuActive(!menuActive);
  };

  const listStatus = () => {
    setListActive(!listActive);
  };

  return (
    <header className={appHeaderStyles.header}>
      <div className={`${appHeaderStyles.container} pr-5 mt-4 mb-4`}>
        <img className={appHeaderStyles.mobileLogo} src={mobileLogo} alt="stellar-burgers" />
        <nav className={`${menuActive ? appHeaderStyles.nav_active : appHeaderStyles.nav}`}>
          <ul className={appHeaderStyles.list}>
            <li className={`${appHeaderStyles.itemMobile}  pl-5 pr-5`} onClick={listStatus}>
              <ProfileIcon type="secondary" />
              <p className="text text_type_main-default pl-2">Личный кабинет</p>
              {listActive ? <ArrowDownIcon type="secondary" /> : <ArrowUpIcon type="secondary" />}
              <ul className={listActive ? appHeaderStyles.subList : appHeaderStyles.subList_active}>
                <li className={appHeaderStyles.subItem}>
                  <a className={appHeaderStyles.link} href="/">
                    Профиль
                  </a>
                </li>
                <li className={appHeaderStyles.subItem}>
                  <a className={appHeaderStyles.link} href="/">
                    История заказов
                  </a>
                </li>
                <li className={appHeaderStyles.subItem}>
                  <a className={appHeaderStyles.link} href="/">
                    Выход
                  </a>
                </li>
              </ul>
            </li>
            <li className={`${appHeaderStyles.item_active} pl-5 pr-5`}>
              <a className={appHeaderStyles.link} href="/">
                <BurgerIcon type="primary" />
                <p className="text text_type_main-default pl-2">Конструктор</p>
              </a>
            </li>
            <li className={`${appHeaderStyles.item}  pl-5 pr-5`}>
              <a className={appHeaderStyles.link} href="/">
                <ListIcon type="secondary" />
                <p className="text text_type_main-default pl-2">Лента заказов</p>
              </a>
            </li>
          </ul>
        </nav>
        <div className={appHeaderStyles.logo}>
          <Logo />
        </div>
        <button className={appHeaderStyles.admin}>
          <ProfileIcon type="secondary" />
          <p className="text text_type_main-default">Личный кабинет</p>
        </button>
        <Burger onClick={navBarStatus} menuActive={menuActive} />
      </div>
    </header>
  );
}

export default AppHeader;
