import Square from './Square';
import { Suspense, lazy, useContext } from 'react';
import { AppContext } from './AppContext';
import './Board.css';
import Loading from './Loading';

function Status({ winner, xIsNext }: Readonly<{ winner: string | null, xIsNext: boolean }>): JSX.Element {
    if (winner) {
        const Winner = lazy(() => import('./Winner'));
        return (
            <Suspense fallback={<Loading />}>
                <Winner value={winner}></Winner>
            </Suspense>
        );
    }

    const next = xIsNext ? 'X' : 'O';
    return <div className="status">Next player: {next}</div>;
}

export default function Board({ xIsNext, squares, onPlay }: Readonly<{ xIsNext: boolean, squares: Array<string | null>, onPlay: (nextSquares: Array<string | null>) => void }>): JSX.Element {
    const { 
        services: { 
            gameService
        } 
    } = useContext(AppContext);

    function handleClick(i: number): void {
        if (gameService.calculateWinner(squares) || squares[i]) {
            return;
        }
    
        const nextSquares = squares.slice();
        nextSquares[i] = xIsNext ? 'X' : 'O';
    
        onPlay(nextSquares);
    }
  
    const winner: string | null = gameService.calculateWinner(squares);
  
    return (
        <>
            <Status winner={winner} xIsNext={xIsNext}></Status>
            {Array.from({ length: 3 }, (_, y: number) => (
            <div className="board-row" key={y}>
                {Array.from({ length: 3 }, (_, x: number) => {
                const index = y * 3 + x;
                return (
                    <Square value={squares[index] ?? ''} onSquareClick={() => handleClick(index)} key={index} />
                );
                })}
            </div>
            ))}
        </>
    );
}
