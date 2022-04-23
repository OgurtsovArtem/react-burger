import LoaderStyle from "./Loader.module.css";

function Loader() {
  return <h2 className={`${LoaderStyle.loader} text text_type_digits-medium`}>Loading...</h2>;
}

export default Loader;
