import React, { ChangeEvent, SyntheticEvent, useEffect } from "react";
import style from "./Login.module.css";
import CenterWrapper from "../../components/CenterWrapper/CenterWrapper";
import { Link } from "react-router-dom";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { formValidator } from "../../utils/formValidator";
import { signIn } from "../../services/actions/user";
import { useDispatch } from "../../services/hooks";

function Login() {
  const [formData, setFormData] = React.useState({
    email: "",
    password: "",
  });
  const [formErrors, setFormErrors] = React.useState({
    email: "",
    password: "",
  });
  const [buttonDisabled, setButtonDisabled] = React.useState(true);
  const [showPassword, setShowPassword] = React.useState(false);

  const dispatch = useDispatch();

  useEffect(() => {
    Object.values(formErrors).every((item) => item)
      ? setButtonDisabled(false)
      : setButtonDisabled(true);
  }, [formErrors]);

  const onIconClick = () => setShowPassword(!showPassword);

  const handleInputChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    target.required = true;

    const error = formValidator(target);
    setFormData({
      ...formData,
      [name]: value,
    });
    setFormErrors({
      ...formErrors,
      [name]: error,
    });
  };
  const sendForm = (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(signIn(formData));
  };

  return (
    <CenterWrapper>
      <form className={`${style.form}`} onSubmit={sendForm}>
        <legend className={`${style.legend} text text_type_main-medium mb-6`}>Вход</legend>
        <Input
          type={"email"}
          placeholder={"E-mail"}
          onChange={handleInputChange}
          value={formData.email}
          name={"email"}
          error={!formErrors.email}
          onIconClick={onIconClick}
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
