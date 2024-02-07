import { useState, useMemo } from "react";

const Item = () => {
    const [text, setText] = useState("");
    const handleChange = (e: any) => setText(e.target.value);
    return <input value={text} onChange={handleChange} />;
}

const Counter = () => {
    const [testCount, setTestCount] = useState(0);
    return <>
        <strong>Independant counter. Click me.</strong>
        <button onClick={() => setTestCount(testCount + 1)}>{testCount}</button>;
    </>
}

const ItemsList = (count: number): JSX.Element[] => {
    const Items = [];
    for (let i = 0; i < count; i++) {
        Items.push(<Item key={i} />);
    }
    return Items;
}

export default function HooksExample() {
    const [count, setCount] = useState<number>(0);
    const addItem = () => setCount(count + 1);

    return (
        <div className="App" style={{ padding: "20px", border: "1px solid lightgray" }}>
            <p>Calling Counter component as a function would not cause error, as it is rendered unconditionally
                Comment line 34 and uncomment 35, then try to add 2 items to see error
            </p>
            <div>{Counter()}</div>
            {/* <div>{count > 1 ? Counter() : <p>less than 2 items added</p>}</div> */}
            <h5>This is the list:</h5>
            <div>
                {ItemsList(count)}
            </div>
            <button style={{ marginTop: "10px" }} onClick={addItem}>Add Item</button>
        </div>
    );
}