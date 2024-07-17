import { useState } from 'react';
import Board from './Board';
import './Game.css';
import { Link, Outlet, useNavigate } from 'react-router-dom';

export default function Game(): JSX.Element {
    const [history, setHistory] = useState([Array(9).fill(null)]);
    const [currentMove, setCurrentMove] = useState(0);
    const xIsNext = currentMove % 2 === 0;
    const currentSquares = history[currentMove];

    function handlePlay(nextSquares: Array<string | null>): void {
        const nextHistory = [...history.slice(0, currentMove + 1), nextSquares];
        setHistory(nextHistory);
        setCurrentMove(nextHistory.length - 1);
    }

    function jumpTo(nextMove: number): void {
        setCurrentMove(nextMove);
    }

    const moves: Array<JSX.Element> = history.map((_, move) => {
        const description = move > 0 ? `Go to move #${move}` : 'Go to game start';

        return (
        <li key={move * 1}>
            <button type="button" onClick={() => jumpTo(move)}>{description}</button>
        </li>
        );
    });

    const navigate = useNavigate();

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
            <Link to="/help">
                <button type="button">Help</button>
            </Link>
            <button type="button" onClick={() => navigate('/help')}>New Help</button>
            <Outlet />
        </>
    );
}
