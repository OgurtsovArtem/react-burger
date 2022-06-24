import React, { ChangeEvent, SyntheticEvent, useEffect } from "react";
import style from "./ProfileForm.module.css";
import { Button, Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useDispatch, useSelector } from "react-redux";
import { update } from "../../services/actions/user";
import { Loader } from "../Loader/Loader";

interface IEditState {
  name: boolean;
  email: boolean;
  password: boolean;
}
interface IFormDataState {
  name: string;
  email: string;
  password: string;
}

function ProfileForm() {
  const { data, sending } = useSelector((state: any) => state.user);

  const initialState: IFormDataState = {
    name: data.name || data.user.name,
    email: data.email || data.user.email,
    password: "",
  };
  const initialEditState: IEditState = {
    name: false,
    email: false,
    password: false,
  };

  const [formData, setFormData] = React.useState(initialState);
  const [edit, setEdit] = React.useState(initialEditState);

  const inputNameRef = React.useRef<HTMLInputElement>(null);
  const inputLoginRef = React.useRef<HTMLInputElement>(null);
  const inputPasswordRef = React.useRef<HTMLInputElement>(null);
  const formRef = React.useRef<HTMLFormElement>(null);
  const dispatch: any = useDispatch();

  useEffect(() => {
    if (formRef.current) {
      [...formRef.current.querySelectorAll("input")].forEach((input) => (input.disabled = true));
    }
  }, []);

  const onIconNameClick = () => {
    if (!inputPasswordRef.current) return;
    if (!inputNameRef.current) return;
    if (!inputLoginRef.current) return;

    setTimeout(() => (inputNameRef.current ? inputNameRef.current.focus() : null), 0);
    setEdit({ password: false, email: false, name: !edit.name });

    const input = inputNameRef.current;
    inputPasswordRef.current.disabled = true;
    inputLoginRef.current.disabled = true;

    !edit.name ? (input.disabled = false) : (input.disabled = true);
  };
  const onIconLoginClick = () => {
    if (!inputPasswordRef.current) return;
    if (!inputNameRef.current) return;
    if (!inputLoginRef.current) return;

    setTimeout(() => (inputLoginRef.current ? inputLoginRef.current.focus() : null), 0);
    setEdit({ name: false, password: false, email: !edit.email });

    const input = inputLoginRef.current;
    inputPasswordRef.current.disabled = true;
    inputNameRef.current.disabled = true;

    !edit.email ? (input.disabled = false) : (input.disabled = true);
  };
  const onIconPasswordClick = () => {
    if (!inputPasswordRef.current) return;
    if (!inputNameRef.current) return;
    if (!inputLoginRef.current) return;

    setTimeout(() => (inputPasswordRef.current ? inputPasswordRef.current.focus() : null), 0);
    setEdit({ name: false, email: false, password: !edit.password });

    const input = inputPasswordRef.current;
    inputNameRef.current.disabled = true;
    inputLoginRef.current.disabled = true;

    !edit.password ? (input.disabled = false) : (input.disabled = true);
  };
  const handleInputChange = (event: ChangeEvent) => {
    const target = event.target as HTMLInputElement;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const resetForm = () => {
    if (!inputPasswordRef.current) return;
    if (!inputNameRef.current) return;
    if (!inputLoginRef.current) return;

    (Object.keys(edit) as Array<keyof typeof edit>).forEach((v) => (edit[v] = false));
    (Object.keys(formData) as Array<keyof typeof edit>).forEach((v) => (edit[v] = false));

    inputPasswordRef.current.disabled = true;
    inputNameRef.current.disabled = true;
    inputLoginRef.current.disabled = true;
  };
  const sendForm = (event: SyntheticEvent) => {
    event.preventDefault();
    dispatch(update(formData));
    return !sending ? resetForm() : null;
  };
  const cancelForm = (event: SyntheticEvent) => {
    event.preventDefault();
    setFormData(initialState);
    resetForm();
  };
  return (
    <>
      {data && !sending ? (
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
          {edit.name || edit.email || edit.password ? (
            <>
              <div className={style.footer}>
                <Button type="primary" size="medium" onClick={sendForm}>
                  Сохранить
                </Button>
                <Button type="primary" size="medium" onClick={cancelForm}>
                  Отмена
                </Button>
              </div>
            </>
          ) : null}
        </form>
      ) : (
        <Loader size="medium" />
      )}
    </>
  );
}

export default ProfileForm;
