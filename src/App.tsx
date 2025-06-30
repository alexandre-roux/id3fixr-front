import "./App.css";
import Home from "./containers/Home";
import {FileObjectProvider} from "./context/FileObjectContext";

function App() {
    return (
        <FileObjectProvider>
            <Home/>
        </FileObjectProvider>
    );
}

export default App;
