import { createContext } from 'react';
import GameService from './GameService';

const services = {
    gameService: new GameService()
};

export const AppContext = createContext({ services });
const { Provider } = AppContext;

export const AppProvider = ({ children }: { children: JSX.Element }) => <Provider value={({ services })}>{children}</Provider>;
