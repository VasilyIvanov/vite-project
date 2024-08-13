import { createContext } from 'react';
import GameService from './GameService';
import { WebSocketEx } from './websocketex';

const myWorker = new SharedWorker(new URL('./worker/shared-worker.ts', import.meta.url));
myWorker.port.onmessage = (e: MessageEvent) => {
    console.log("Message received from worker", e);
};
myWorker.port.postMessage([3, 7]);
console.log("Message posted to worker");

const wsx = new WebSocketEx('wss://echo.websocket.org');
wsx.subscribe('');

const services = {
    gameService: new GameService()
};

export const AppContext = createContext({ services });
const { Provider } = AppContext;

export const AppProvider = ({ children }: { children: JSX.Element }) => <Provider value={({ services })}>{children}</Provider>;
