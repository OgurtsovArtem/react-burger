import { FC } from "react";
import style from "./CenterWrapper.module.css";

type Props = {
  children?: React.ReactNode;
};

const CenterWrapper: FC<Props> = ({ children }) => {
  return <section className={style.formWrapper}>{children}</section>;
};

export default CenterWrapper;
