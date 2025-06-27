import "./App.css";
import Home from "./containers/Home";
import {FileProvider} from "./context/FileContext";

function App() {
    return (
        <FileProvider>
            <Home/>
        </FileProvider>
    );
}

export default App;
