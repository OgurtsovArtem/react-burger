import React from "react";
import style from "./Login.module.css";
import CenterWrapper from "../../components/CenterWrapper/CenterWrapper";
import { Link } from "react-router-dom";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { getUser, login } from "../../utils/api";
import { formValidator } from "../../utils/formValidator";

function Login() {
  const initialState = {
    email: "",
    password: "",
  };
  const [state, setState] = React.useState(initialState);
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
      console.log("неверное поле");
      return;
    }
    console.log(getUser().then((res) => console.log(res)));

    // login(state).then((res) => console.log(res));
  };

  return (
    <CenterWrapper>
      <form className={`${style.form}`}>
        <legend className={`${style.legend} text text_type_main-medium mb-6`}>Вход</legend>
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
          Войти
        </Button>
        <div className={`${style.footnote} mb-4 mt-20`}>
          <p className={style.text}>Вы — новый пользователь?</p>
          <Link to="/register">Зарегистрироваться</Link>
        </div>
        <div className={style.footnote}>
          <p className={style.text}>Забыли пароль?</p>
          <Link to="/forgot-password">Восстановить пароль</Link>
        </div>
      </form>
    </CenterWrapper>
  );
}

export default Login;
