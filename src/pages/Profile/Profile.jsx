import React from "react";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import CenterWrapper from "../../components/CenterWrapper/CenterWrapper";
import style from "./Profile.module.css";

function Profile() {
  const location = useLocation();
  const history = useHistory();

  const [state, setState] = React.useState("");
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };
  const handleInputChange = (event) => {
    const target = event.target;

    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setState({
      ...state,
      [name]: value,
    });
  };
  console.table(state);
  return (
    <CenterWrapper>
      <div className={style.profile}>
        <nav className={style.nav}>
          <ul className={style.list}>
            <li className={`${style.item} text text_type_main-medium`}>
              <NavLink to="/profile" className={style.link} activeClassName={style.activeLink}>
                Профиль
              </NavLink>
            </li>
            <li className={`${style.item} text text_type_main-medium`}>
              <NavLink to="/order" className={style.link} activeClassName={style.activeLink}>
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
        <div className={style.data}>
          <Input
            type={"text"}
            placeholder={"Имя"}
            onChange={handleInputChange}
            icon={"EditIcon"}
            value={state.name}
            name={"name"}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
          />
          <Input
            type={"text"}
            placeholder={"Логин"}
            onChange={handleInputChange}
            icon={"EditIcon"}
            value={state.login}
            name={"login"}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
          />
          <Input
            type={"text"}
            placeholder={"Пароль"}
            onChange={handleInputChange}
            icon={"EditIcon"}
            value={state.password}
            name={"password"}
            error={false}
            ref={inputRef}
            onIconClick={onIconClick}
            errorText={"Ошибка"}
            size={"default"}
          />
        </div>
      </div>
    </CenterWrapper>
  );
}

export default Profile;
