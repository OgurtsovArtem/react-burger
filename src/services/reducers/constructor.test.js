import { initialState, constructorBurgerReducer } from './constructor';
import { order } from "../../utils/mock";
import { GET_ORDER_REQUEST, GET_ORDER_SUCCESS, GET_ORDER_FAILED, CLEAR_ORDER } from '../action-types';

describe('Constructor reducer', () => {

  it('Проверка начального состояния', () => {
      const result = constructorBurgerReducer(initialState, {});
      expect(result).toEqual(initialState)
  });
  it('Запрос данных заказа', () => {
      const result = constructorBurgerReducer(initialState, { type: GET_ORDER_REQUEST });
      expect(result).toEqual({ ...initialState, orderRequest: true, orderFailed: false })
  });
  it('Ошибка запроса данных заказа', () => {
      const result = constructorBurgerReducer(initialState, { type: GET_ORDER_FAILED });
      expect(result).toEqual({ ...initialState, orderFailed: true, orderRequest: false, orderLoader: false })
  });
  it('Успешный запрос данных заказа', () => {
      const result = constructorBurgerReducer(initialState, { type: GET_ORDER_SUCCESS, data: order });
      expect(result).toEqual({ ...initialState, orderStatus: order, orderRequest: false, orderLoader: false, })
  });
  it('Отчистка данных заказа', () => {
    const result = constructorBurgerReducer(initialState, { type: CLEAR_ORDER });
    expect(result).toEqual({ ...initialState, orderStatus: {}, orderLoader: true, })
  });
})