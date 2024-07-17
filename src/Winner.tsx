import './Winner.css';

export default function Winner({ value }: Readonly<{ value: string }>): JSX.Element {
    return (
        <div className="status">Winner: {value}</div>
    );
}
