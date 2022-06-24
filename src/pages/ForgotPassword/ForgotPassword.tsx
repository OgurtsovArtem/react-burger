import React, { ChangeEvent, SyntheticEvent, useEffect } from "react";
import style from "./ForgotPassword.module.css";
import CenterWrapper from "../../components/CenterWrapper/CenterWrapper";
import { Link } from "react-router-dom";
import { Input, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import { formValidator } from "../../utils/formValidator";
import { forgotPassword } from "../../utils/api";
import { useHistory, useLocation } from "react-router-dom";

function ForgotPassword() {
  const history = useHistory();
  const location = useLocation();

  const initialState = {
    email: "",
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
    setformErrors({
      ...formErrors,
      [name]: error,
    });
  };

  const sendForm = (event: SyntheticEvent) => {
    event.preventDefault();
    forgotPassword(formData).then((res) => {
      if (res.success === true) {
        history.replace({
          pathname: "/reset-password",
          state: { resetDone: location },
        });
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
          type={"email"}
          placeholder={"Укажите e-mail"}
          onChange={handleInputChange}
          value={formData.email}
          name={"email"}
          error={!formErrors.email}
          onIconClick={onIconClick}
          errorText={"Некорректный E-mail"}
          size={"default"}
        />
        <Button type="primary" size="medium" disabled={buttonDisabled}>
          Восстановить
        </Button>
        <div className={`${style.footnote} mb-4 mt-20`}>
          <p className={style.text}>Вспомнили пароль?</p>
          <Link to="/login">Войти</Link>
        </div>
      </form>
    </CenterWrapper>
  );
}

export default ForgotPassword;
