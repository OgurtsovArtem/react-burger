import React from "react";
import AppHeader from "../AppHeader/AppHeader";
import BurgerBody from "..//BurgerBody/BurgerBody";

const DATA_URL = "https://norma.nomoreparties.space/api";

function App() {
  const [state, setState] = React.useState({
    success: false,
    data: [],
  });

  const getData = () => {
    fetch(`${DATA_URL}/ingredients`)
      .then((res) => {
        if (!res.ok) {
          throw res;
        }
        return res.json();
      })
      .then((data) => {
        setState({ ...state, data: data.data, success: true });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  React.useEffect(() => {
    getData();
  }, []);

  return (
    <>
      <AppHeader />
      <BurgerBody state={state} />
    </>
  );
}

export default App;
