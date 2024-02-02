import Example from "./components/AddTasks-fn";
import Example1 from "./components/AddTasks-jsx";
import Example3 from "./components/DataProviderExample";
import Styled from "./shared/Styled";
import "./App.css";

function App() {
  return <Styled.Container>
    <Example />
    <Example1 />
    <Example3 />
  </Styled.Container>
}

export default App;
