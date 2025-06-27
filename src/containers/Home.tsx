import FileSelector from "../components/FileSelector/FileSelector.tsx";
import FileDetailsEditor from "../components/FileDetailsDisplayer/FileDetailsEditor.tsx";
import DiscogsSearcher from "../components/DiscogsSearcher/DiscogsSearcher.tsx";
import {useFileContext} from "../context/FileContext.tsx"; // Adjust the import path
import "./Home.scss";

const Home = () => {
    const {originalFile, originalTags} = useFileContext();

    return (
        <div className="home">
            <h1>Select a file</h1>
            <FileSelector/>
            {originalFile && (
                <>
                    <h1>File details</h1>
                    <FileDetailsEditor/>
                </>
            )}
            {originalTags && (
                <>
                    <h1>Discogs search results</h1>
                    <DiscogsSearcher/>
                </>
            )}
        </div>
    );
};

export default Home;