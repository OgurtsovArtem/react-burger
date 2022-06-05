import style from "./CenterWrapper.module.css";

function CenterWrapper({ children }) {
  return <section className={style.formWrapper}>{children}</section>;
}

export default CenterWrapper;
