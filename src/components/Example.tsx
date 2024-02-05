import { useState, useMemo } from "react";


export default function HooksExample() {
    const [count, setCount] = useState<number>(0);
    const addItem = () => setCount(count + 1);

    const Item = useMemo(() => () => {
        const [text, setText] = useState("");
        const handleChange = (e: any) => setText(e.target.value);
        return <input value={text} onChange={handleChange} />;
    }, []);

    const Counter = useMemo(() => () => {
        const [testCount, setTestCount] = useState(0);
        return <button onClick={() => setTestCount(testCount + 1)}>{testCount}</button>;
    }, []);

    const ItemsList = useMemo(() => (count: number): JSX.Element[] => {
        const Items = [];
        for (let i = 0; i < count; i++) {
            Items.push(<Item key={i} />);
        }
        return Items;
    }, [count]);

    return (
        <div className="App">
            <button onClick={addItem}>Add Item</button>
            <h1>This is the list:</h1>
            <div>{Counter()}</div>
            <div>
                {ItemsList(count)}
            </div>
        </div>
    );
}