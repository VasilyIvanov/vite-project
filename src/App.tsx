import { AppProvider } from './AppContext';
import Game from './Game';

export default function App(): JSX.Element {
    return (
        <AppProvider>
            <div className="app">
                <Game />
            </div>
        </AppProvider>
    );
}
