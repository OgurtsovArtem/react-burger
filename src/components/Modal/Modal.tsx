import { FC, useEffect } from "react";
import ReactDOM from "react-dom";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import ModalStyle from "./Modal.module.css";

interface IModalProps {
  onClose: () => void;
  children?: React.ReactNode;
  header?: string;
}

const modalRoot = document.getElementById("modal-root") as HTMLDivElement;

const Modal: FC<IModalProps> = ({ onClose, children, header }) => {
  useEffect(() => {
    const escape = (event: KeyboardEvent) => {
      if (event.code === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [onClose]);

  const modal = (
    <>
      <div className={`${ModalStyle.modal}  pt-10 pl-10 pr-10 pb-10`}>
        <header className={ModalStyle.header}>
          <h2 className={`${ModalStyle.title} text text_type_main-medium`}>{header}</h2>
          <button className={ModalStyle.close}>
            <CloseIcon onClick={onClose} type={"primary"} />
          </button>
        </header>
        <div className={`${ModalStyle.body}`}>{children}</div>
      </div>
      <ModalOverlay onClose={onClose} />
    </>
  );

  return ReactDOM.createPortal(modal, modalRoot);
};
export default Modal;
