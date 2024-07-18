import Board from './Board';
import './Game.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from './hooks';
import { set as setHistory, reset as resetHistory } from './historySlice';
import { increment as incrementCurrentMove, set as setCurrentMove, reset as resetCurrentMove } from './currentMoveSlice';

export default function Game(): JSX.Element {
    const history = useAppSelector((state) => state.history.value);
    const currentMove = useAppSelector((state) => state.currentMove.value);
    const dispatch = useAppDispatch();

    const navigate = useNavigate();

    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares: Array<string | null>): void {
        dispatch(setHistory({ currentMove, nextSquares }));
        dispatch(incrementCurrentMove());
    }

    function jumpTo(nextMove: number): void {
        dispatch(setCurrentMove(nextMove));
    }

    function reset(): void {
        dispatch(resetHistory());
        dispatch(resetCurrentMove());
    }

    const moves: Array<JSX.Element> = history.map((_, move) => {
        const description = move > 0 ? `Go to move #${move}` : 'Go to game start';

        return (
        <li key={move * 1}>
            <button type="button" onClick={() => jumpTo(move)}>{description}</button>
        </li>
        );
    });

    return (
        <>
            <div className="game">
                <div className="game-board">
                    <Board xIsNext={xIsNext} squares={currentSquares} onPlay={handlePlay} />
                </div>
                <div className="game-info">
                    <ol>{moves}</ol>
                </div>
            </div>
            <button type="button" onClick={() => reset()}>Reset</button>
            <Link to="/help">
                <button type="button">Help</button>
            </Link>
            <button type="button" onClick={() => navigate('/help')}>New Help</button>
            <Outlet />
        </>
    );
}
