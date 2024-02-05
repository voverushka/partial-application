import Example from "./components/AddTasks-fn";
import Example1 from "./components/AddTasks-jsx";
import Example3 from "./components/DataProviderExample";
import Example4 from "./components/DataProviderExampleProps";
//import Example4 from "./components/Example";
import Styled from "./shared/Styled";
import "./App.css";

function App() {
  return <Styled.Container>
    <Example />
    {/* <Example1 /> */}
    {/* <Example3 /> */}
    <Example3 />
    <Example4 />
  </Styled.Container>
}

export default App;
