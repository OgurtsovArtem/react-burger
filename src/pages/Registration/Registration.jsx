import React from "react";
import style from "./Registration.module.css";
import CenterWrapper from "../../components/CenterWrapper/CenterWrapper";
import { Link } from "react-router-dom";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { login, registerUser } from "../../utils/api";

function Registration() {
  const [state, setState] = React.useState({
    name: "",
    email: "",
    password: "",
  });
  const handleInputChange = (event) => {
    const target = event.target;

    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setState({
      ...state,
      [name]: value,
    });
  };

  const onIconClick = (event) => {
    setTimeout(() => event.target.focus(), 0);
    alert("Icon Click Callback");
  };
  const sendForm = (event) => {
    event.preventDefault();
    const { target } = event;
    const formNode = target.form;
    const formIsValid = formNode.checkValidity();
    if (!formIsValid) {
      return;
    }
    const formData = new FormData(formNode);
    console.log(formData);
    console.log(state);
    registerUser(state).then((res) => console.log(res));
  };

  return (
    <CenterWrapper>
      <form className={`${style.form}`}>
        <legend className={`${style.legend} text text_type_main-medium mb-6`}>Регистрация</legend>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleInputChange}
          value={state.name}
          name={"name"}
          error={false}
          onIconClick={onIconClick}
          errorText={"Заполните поле"}
          size={"default"}
        />
        <Input
          type={"email"}
          placeholder={"E-mail"}
          onChange={handleInputChange}
          value={state.email}
          name={"email"}
          error={false}
          onIconClick={onIconClick}
          errorText={"Некорректный E-mail"}
          size={"default"}
        />
        <Input
          type={"password"}
          placeholder={"Пароль"}
          onChange={handleInputChange}
          icon={"ShowIcon"}
          value={state.password}
          name={"password"}
          error={false}
          onIconClick={onIconClick}
          errorText={"Неверный пароль"}
          size={"default"}
        />
        <Button type="primary" size="medium" onClick={sendForm}>
          Зарегистрироваться
        </Button>
        <div className={`${style.footnote} mb-4 mt-20`}>
          <p className={style.text}>Уже зарегистрированы?</p>
          <Link to="/login">Войти</Link>
        </div>
      </form>
    </CenterWrapper>
  );
}

export default Registration;
