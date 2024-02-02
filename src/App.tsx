import Example from "./components/AddTasks-fn";
import Example1 from "./components/AddTasks-jsx";
import Styled from "./shared/Styled";
import "./App.css";

function App() {
  return <Styled.Container>
    <Example />
    <Example1 />
  </Styled.Container>
}

export default App;
