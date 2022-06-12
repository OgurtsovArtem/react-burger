import React, { useEffect } from "react";
import style from "./ResetPassword.module.css";
import CenterWrapper from "../../components/CenterWrapper/CenterWrapper";
import { Link } from "react-router-dom";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { formValidator } from "../../utils/formValidator";
import { resetPassword } from "../../utils/api";
import { useHistory } from "react-router-dom";

function ResetPassword() {
  const history = useHistory();
  const initialState = {
    token: "",
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
    console.log(formData);
    resetPassword(formData).then((res) => {
      if (res.success === true) {
        history.replace({ pathname: "/login" });
      } else {
        console.error(res.message);
      }
    });
  };

  return (
    <CenterWrapper>
      <form className={`${style.form}`} onSubmit={sendForm}>
        <legend className={`${style.legend} text text_type_main-medium mb-6`}>
          Восстановление пароля
        </legend>
        <Input
          type={showPassword ? "text" : "password"}
          placeholder={"Введите новый пароль"}
          onChange={handleInputChange}
          icon={showPassword ? "HideIcon" : "ShowIcon"}
          value={formData.password}
          name={"password"}
          error={!formErrors.password}
          onIconClick={onIconClick}
          errorText={"Некорректный пароль"}
          size={"default"}
        />
        <Input
          type={"text"}
          placeholder={"Введите код из письма"}
          onChange={handleInputChange}
          value={formData.token}
          name={"token"}
          error={!formErrors.token}
          errorText={"Ошибка"}
          size={"default"}
        />
        <Button type="primary" size="medium" disabled={buttonDisabled}>
          Сохранить
        </Button>
        <div className={`${style.footnote} mb-4 mt-20`}>
          <p className={style.text}>Вспомнили пароль?</p>
          <Link to="/login">Войти</Link>
        </div>
      </form>
    </CenterWrapper>
  );
}

export default ResetPassword;
