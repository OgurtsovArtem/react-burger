import ModalOverlayStyle from "./ModalOverlay.module.css";
import { FC } from "react";

interface IModalOverlayProps {
  onClose: () => void;
}

const ModalOverlay: FC<IModalOverlayProps> = ({ onClose }) => {
  return <div onClick={onClose} className={ModalOverlayStyle.overlay}></div>;
};

export default ModalOverlay;
