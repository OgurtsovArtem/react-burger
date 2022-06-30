import { FC } from "react";
import style from "./Loader.module.css";
import { LoaderSvg } from "./loader.svg";

interface Iloader {
  size: "small" | "medium" | "large";
  inverse?: boolean;
}

const loaderSizes = {
  small: 16,
  medium: 24,
  large: 40,
};

export const Loader: FC<Iloader> = ({ size, inverse = false }) => {
  const loaderColor = inverse ? "#fff" : "#3C39EC";

  const wrapperStyleKey = "wrapper_" + size;
  return (
    <div className={style[wrapperStyleKey]}>
      <LoaderSvg color={loaderColor} size={loaderSizes[size]} />
    </div>
  );
};
