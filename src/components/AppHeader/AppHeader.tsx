import {
  BurgerIcon,
  ListIcon,
  ProfileIcon,
  Logo,
} from "@ya.praktikum/react-developer-burger-ui-components";

import Burger from "../Burger/Burger";

import appHeaderStyles from "./AppHeader.module.css";

import mobileLogo from "../../icons/logo_mobile.svg";

function AppHeader() {
  return (
    <header className={appHeaderStyles.header}>
      <div className={`${appHeaderStyles.container} pl-5 pr-5 mt-5 mb-5`}>
        <img className={appHeaderStyles.mobile_logo} src={mobileLogo} alt="stellar-burgers" />
        <nav className={appHeaderStyles.nav}>
          <ul className={appHeaderStyles.list}>
            <li className={`${appHeaderStyles.item_mobile}  pl-5 pr-5`}>
              <ProfileIcon type="primary" />
              <p className="text text_type_main-default">Личный кабинет</p>
              <ul className={appHeaderStyles.subList}>
                <li className={appHeaderStyles.subItem}>Профиль</li>
                <li className={appHeaderStyles.subItem}>История заказов</li>
                <li className={appHeaderStyles.subItem}>Выход</li>
              </ul>
            </li>
            <li className={`${appHeaderStyles.item}  pl-5 pr-5`}>
              <BurgerIcon type="primary" />
              <p className="text text_type_main-default">Конструктор</p>
            </li>
            <li className={`${appHeaderStyles.item}  pl-5 pr-5`}>
              <ListIcon type="primary" />
              <p className="text text_type_main-default">Конструктор</p>
            </li>
          </ul>
        </nav>
        <div className={appHeaderStyles.logo}>
          <Logo />
        </div>
        <div className={appHeaderStyles.admin}>
          <ProfileIcon type="primary" />
          <p className="text text_type_main-default">Личный кабинет</p>
        </div>
        <Burger />
      </div>
    </header>
  );
}

export default AppHeader;
