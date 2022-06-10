import React from "react";
import style from "./ProfileForm.module.css";
import { Input } from "@ya.praktikum/react-developer-burger-ui-components";

function ProfileForm() {
  const [state, setState] = React.useState({
    name: "",
    login: "",
    password: "",
  });

  const inputNameRef = React.useRef(null);
  const inputLoginRef = React.useRef(null);
  const inputPasswordRef = React.useRef(null);
  const onIconNameClick = () => {
    setTimeout(() => inputNameRef.current.focus(), 0);
  };
  const onIconLoginClick = () => {
    setTimeout(() => inputLoginRef.current.focus(), 0);
  };
  const onIconPasswordClick = () => {
    setTimeout(() => inputPasswordRef.current.focus(), 0);
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
  return (
    <form className={style.form}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={handleInputChange}
        icon={"EditIcon"}
        value={state.name}
        name={"name"}
        error={false}
        ref={inputNameRef}
        onIconClick={onIconNameClick}
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
        ref={inputLoginRef}
        onIconClick={onIconLoginClick}
        errorText={"Ошибка"}
        size={"default"}
      />
      <Input
        type={"password"}
        placeholder={"Пароль"}
        onChange={handleInputChange}
        icon={"EditIcon"}
        value={state.password}
        name={"password"}
        error={false}
        ref={inputPasswordRef}
        onIconClick={onIconPasswordClick}
        errorText={"Ошибка"}
        size={"default"}
      />
    </form>
  );
}

export default ProfileForm;
