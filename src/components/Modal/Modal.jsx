import ReactDOM from "react-dom";
import PropTypes from "prop-types";
import { useEffect } from "react";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import ModalOverlay from "../ModalOverlay/ModalOverlay";
import ModalStyle from "./Modal.module.css";

const modalRoot = document.getElementById("modal-root");

function Modal({ onClose, children, header }) {
  useEffect(() => {
    const escape = (event) => {
      return event.code === "Escape" ? onClose() : null;
    };

    document.addEventListener("keydown", escape);
    return () => document.removeEventListener("keydown", escape);
  }, [onClose]);
  return ReactDOM.createPortal(
    <>
      <div className={`${ModalStyle.modal}  pt-10 pl-10 pr-10 pb-10`}>
        <header className={ModalStyle.header}>
          <h2 className={`${ModalStyle.title} text text_type_main-medium`}>{header}</h2>
          <button className={ModalStyle.close}>
            <CloseIcon onClick={onClose} />
          </button>
        </header>
        <div className={`${ModalStyle.body}`}>{children}</div>
      </div>
      <ModalOverlay onClose={onClose} />
    </>,
    modalRoot
  );
}
Modal.propTypes = {
  onClose: PropTypes.func.isRequired,
  children: PropTypes.element.isRequired,
  header: PropTypes.string,
};

export default Modal;
