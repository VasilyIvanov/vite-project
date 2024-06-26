import Square from './Square';
import { useContext } from 'react';
import { AppContext } from './AppContext';
import './Board.css';

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
    const next = xIsNext ? 'X' : 'O';
    const status = winner ? `Winner: ${winner}` : `Next player: ${next}`;
  
    return (
        <>
            <div className="status">{status}</div>
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
