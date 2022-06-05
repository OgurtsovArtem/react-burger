import React from "react";
import style from "./Registration.module.css";
import CenterWrapper from "../../components/CenterWrapper/CenterWrapper";
import { Link } from "react-router-dom";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";

function Registration() {
  const [value, setValue] = React.useState("");
  const inputRef = React.useRef(null);
  const onIconClick = () => {
    setTimeout(() => inputRef.current.focus(), 0);
    alert("Icon Click Callback");
  };

  return (
    <CenterWrapper>
      <form className={`${style.form}`}>
        <legend className={`${style.legend} text text_type_main-medium mb-6`}>Регистрация</legend>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          name={"name"}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={"Заполните поле"}
          size={"default"}
        />
        <Input
          type={"email"}
          placeholder={"E-mail"}
          onChange={(e) => setValue(e.target.value)}
          value={value}
          name={"email"}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={"Некорректный E-mail"}
          size={"default"}
        />
        <Input
          type={"password"}
          placeholder={"Пароль"}
          onChange={(e) => setValue(e.target.value)}
          icon={"ShowIcon"}
          value={value}
          name={"password"}
          error={false}
          ref={inputRef}
          onIconClick={onIconClick}
          errorText={"Неверный пароль"}
          size={"default"}
        />
        <Button type="primary" size="medium">
          Зарегистрироваться
        </Button>
        <div className={`${style.footnote} mb-4 mt-20`}>
          <p className={style.text}>Уже зарегистрированы?</p>
          <Link to="/">Войти</Link>
        </div>
      </form>
    </CenterWrapper>
  );
}

export default Registration;
