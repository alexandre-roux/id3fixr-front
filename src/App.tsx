import "./App.css";
import Home from "./containers/Home.tsx";
import {FileProvider} from "./context/FileContext.tsx";

function App() {
    return (
        <FileProvider>
            <Home/>
        </FileProvider>
    );
}

export default App;