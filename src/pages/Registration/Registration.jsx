import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import style from "./Registration.module.css";
import CenterWrapper from "../../components/CenterWrapper/CenterWrapper";
import { Link } from "react-router-dom";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { registerUser } from "../../utils/api";
import { formValidator } from "../../utils/formValidator";

function Registration() {
  const { registerUserFailed, registerUserRequest } = useSelector((state) => state.user);
  const history = useHistory();
  const initialState = {
    name: "",
    email: "",
    password: "",
  };

  const [formData, setFormData] = React.useState(initialState);
  const [formErrors, setformErrors] = React.useState(initialState);
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);

  useEffect(() => {
    Object.values(formErrors).every((item) => item)
      ? setButtonDisabled(false)
      : setButtonDisabled(true);
  }, [formErrors]);

  const onIconClick = () => setShowPassword(!showPassword);

  const handleInputChange = (event) => {
    const target = event.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    target.required = true;

    const error = formValidator(target);

    setFormData({
      ...formData,
      [name]: value,
    });
    setformErrors({
      ...formErrors,
      [name]: error,
    });
  };

  const sendForm = (event) => {
    event.preventDefault();
    registerUser(formData).then((res) => console.log(res));
    if (!registerUserRequest && !registerUserFailed) {
      history.replace({ pathname: "/login" });
    }
  };

  return (
    <CenterWrapper>
      <form className={`${style.form}`} onSubmit={sendForm}>
        <legend className={`${style.legend} text text_type_main-medium mb-6`}>Регистрация</legend>
        <Input
          type={"text"}
          placeholder={"Имя"}
          onChange={handleInputChange}
          value={formData.name}
          name={"name"}
          error={!formErrors.name}
          errorText={"Заполните поле"}
          size={"default"}
        />
        <Input
          type={"email"}
          placeholder={"E-mail"}
          onChange={handleInputChange}
          value={formData.email}
          name={"email"}
          error={!formErrors.email}
          errorText={"Некорректный E-mail"}
          size={"default"}
        />
        <Input
          type={showPassword ? "text" : "password"}
          placeholder={"Пароль"}
          onChange={handleInputChange}
          icon={showPassword ? "HideIcon" : "ShowIcon"}
          value={formData.password}
          name={"password"}
          error={!formErrors.password}
          onIconClick={onIconClick}
          errorText={"Неверный пароль"}
          size={"default"}
        />
        <Button type="primary" size="medium" disabled={buttonDisabled}>
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
