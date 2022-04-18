import { CurrencyIcon, Button } from "@ya.praktikum/react-developer-burger-ui-components";
import BurgerConstructorStyle from "./BurgerConstructor.module.css";

function BurgerConstructor() {
  return (
    <aside className={BurgerConstructorStyle.basket}>
      <div className={BurgerConstructorStyle.body}></div>
      <div className={BurgerConstructorStyle.footer}>
        <div className={BurgerConstructorStyle.totalPrice}>
          <span className={BurgerConstructorStyle.totalValue}>610</span>
          <CurrencyIcon type="primary" />
        </div>
        <Button type="primary" size="medium">
          Оформить заказ
        </Button>
      </div>
    </aside>
  );
}

export default BurgerConstructor;
