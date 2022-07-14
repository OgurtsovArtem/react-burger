// socketMiddleware.ts
import type { AnyAction, Middleware, MiddlewareAPI } from 'redux';

import type { AppDispatch, RootState, TWsMiddlewareActions } from '../../utils/types';
import { getCookie } from '../../utils/utils';

export const socketMiddleware = (wsUrl: string, wsActions: TWsMiddlewareActions): Middleware => {
    return (store: MiddlewareAPI<AppDispatch, RootState>) => {
        let socket: WebSocket | null = null;
        let token: string | undefined = undefined;

        return (next) => async (action: AnyAction) => {
            const { dispatch } = store;
            const { type, payload } = action;
            const { wsInit, wsUserInit, onOpen, onError, onMessage, onClose} = wsActions;

            if (type === wsInit) {
                socket = new WebSocket(`${wsUrl}${payload}`);
                console.log('Start')
            } else if (type === wsUserInit) {
                token = getCookie('accessToken');
                if (token) {
                    socket = new WebSocket(`${wsUrl}?token=${token.split(' ')[1]}`);
                    console.log('userStart')
                } else {
                    console.log('Token not found');
                }
            }

            if (socket) {

                      // функция, которая вызывается при открытии сокета
              socket.onopen = event => {
                console.log('wsConnect')
                dispatch({ type: onOpen });
              };

                      // функция, которая вызывается при ошибке соединения
              socket.onerror = event => {
                dispatch({ type: onError });
              };

                      // функция, которая вызывается при получения события от сервера
              socket.onmessage = event => {
                const { data } = event;
                const parsedData = JSON.parse(data);
                console.log('wsConnectMessage')
                dispatch({ type: onMessage, payload: parsedData });         

              };
                      // функция, которая вызывается при закрытии соединения
              socket.onclose = event => {
                dispatch({ type: onClose })
              };
            }

            next(action);
        };
    };
};