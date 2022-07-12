// socketMiddleware.ts
import type { Middleware, MiddlewareAPI } from 'redux';

import type { TApplicationActions, AppDispatch, RootState } from '../../utils/types';
import { getCookie } from '../../utils/utils';

export const socketMiddleware = (wsUrl: string): Middleware => {
    return ((store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        
    return next => (action: TApplicationActions) => {
      const { dispatch } = store;
      const { type, payload }: any = action;
 
      if (type === 'WS_CONNECTION_START') {
            // объект класса WebSocket
        socket = new WebSocket(`${wsUrl}/all`);
      }
      if (type === 'WS_CONNECTION_USER_START') {
        // объект класса WebSocket
        socket = new WebSocket(`${wsUrl}`);
        const token = getCookie('accessToken');

        if (token) {
            socket = new WebSocket(`${wsUrl}?token=${token.split(' ')[1]}`);
        } else {
            console.log('Не найден токен');
        }
      }
      if (socket) {

                // функция, которая вызывается при открытии сокета
        socket.onopen = event => {
          dispatch({ type: 'WS_CONNECTION_SUCCESS', payload: event });
        };

                // функция, которая вызывается при ошибке соединения
        socket.onerror = event => {
          dispatch({ type: 'WS_CONNECTION_ERROR', payload: event });
        };

                // функция, которая вызывается при получения события от сервера
        socket.onmessage = event => {
          const { data } = event;
          const parsedData = JSON.parse(data);
          dispatch({ type: 'WS_GET_ALL_ORDERS', payload: parsedData });         

        };
                // функция, которая вызывается при закрытии соединения
        socket.onclose = event => {
          dispatch({ type: 'WS_CONNECTION_CLOSED', payload: event })
        };

        if (type === 'WS_SEND_MESSAGE') {
          const message = payload;
                // функция для отправки сообщения на сервер
          socket.send(JSON.stringify(message));
        }
      }

      next(action);
    };
    }) as Middleware;
};