import { initialState, wsReducer } from './wsReducer';
import { ordersSocket } from "../../utils/mock";
import {
  WS_CONNECTION_SUCCESS,
  WS_CONNECTION_ERROR,
  WS_CONNECTION_CLOSED,
  WS_GET_ALL_ORDERS
} from '../action-types';

describe('wsReducer  reducer', () => {

  it('Проверка начального состояния', () => {
      const result = wsReducer(initialState, {});
      expect(result).toEqual(initialState)
  });
  it('Успешное подключение сокета', () => {
      const result = wsReducer(initialState, { type: WS_CONNECTION_SUCCESS });
      expect(result).toEqual({ ...initialState, wsConnected: true })
  });
  it('Ошибка подключения сокета', () => {
      const result = wsReducer(initialState, { type: WS_CONNECTION_ERROR });
      expect(result).toEqual({ ...initialState, wsConnected: false })
  });
  it('Соединение закрыто', () => {
      const result = wsReducer(initialState, { type: WS_CONNECTION_CLOSED });
      expect(result).toEqual({ ...initialState, wsConnected: false, data: null })
  });
  it('Получение списка заказов', () => {
    const result = wsReducer(initialState, { type: WS_GET_ALL_ORDERS, payload: ordersSocket });
    expect(result).toEqual({ ...initialState, data: ordersSocket })
  });
})