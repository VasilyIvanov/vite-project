import './Square.css';

export default function Square({ value, onSquareClick }: Readonly<{ value: string, onSquareClick: () => void }>): JSX.Element {
    return (
        <button type="button" className="square" onClick={onSquareClick}>
            {value}
        </button>
    );
}
