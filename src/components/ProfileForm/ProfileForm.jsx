import React, { useEffect } from "react";
import style from "./ProfileForm.module.css";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../services/actions/user";

function ProfileForm() {
  const { data, sending } = useSelector((state) => state.user);
  const initialState = {
    name: data.name || "name",
    email: data.email || "email",
    password: "*****",
  };
  const initialEditState = {
    name: false,
    email: false,
    password: false,
    edited: false,
  };
  const [formData, setFormData] = React.useState(initialState);
  const [edit, setEdit] = React.useState(initialEditState);

  const inputNameRef = React.useRef(null);
  const inputLoginRef = React.useRef(null);
  const inputPasswordRef = React.useRef(null);
  const formRef = React.useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (formRef) {
      [...formRef.current.querySelectorAll("input")].forEach((input) => (input.disabled = true));
    }
  }, []);

  const onIconNameClick = () => {
    setTimeout(() => inputNameRef.current.focus(), 0);
    setEdit({ ...edit, name: !edit.name, edited: !edit.edited });
    setFormData(initialState);
    const input = inputNameRef.current;
    !edit.name ? (input.disabled = false) : (input.disabled = true);
  };
  const onIconLoginClick = () => {
    setTimeout(() => inputLoginRef.current.focus(), 0);
    setEdit({ ...edit, email: !edit.email, edited: !edit.edited });
    setFormData(initialState);
    const input = inputLoginRef.current;
    !edit.email ? (input.disabled = false) : (input.disabled = true);
  };
  const onIconPasswordClick = () => {
    setTimeout(() => inputPasswordRef.current.focus(), 0);
    setEdit({ ...edit, password: !edit.password, edited: !edit.edited });
    setFormData(initialState);
    const input = inputPasswordRef.current;
    !edit.password ? (input.disabled = false) : (input.disabled = true);
  };
  const handleInputChange = (event) => {
    const target = event.target;

    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  const sendForm = (event) => {
    event.preventDefault();
    dispatch(update(formData));
    return !sending ? Object.keys(edit).forEach((v) => (edit[v] = false)) : null;
  };
  return (
    <form className={style.form} ref={formRef}>
      <Input
        type={"text"}
        placeholder={"Имя"}
        onChange={handleInputChange}
        icon={edit.name ? "CloseIcon" : "EditIcon"}
        value={formData.name}
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
        icon={edit.email ? "CloseIcon" : "EditIcon"}
        value={formData.email}
        name={"email"}
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
        icon={edit.password ? "CloseIcon" : "EditIcon"}
        value={formData.password}
        name={"password"}
        error={false}
        ref={inputPasswordRef}
        onIconClick={onIconPasswordClick}
        errorText={"Ошибка"}
        size={"default"}
      />
      {edit.edited ? (
        <Button type="primary" size="medium" onClick={sendForm}>
          Сохранить
        </Button>
      ) : null}
    </form>
  );
}

export default ProfileForm;
