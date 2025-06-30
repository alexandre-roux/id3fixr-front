import FileSelector from "../components/FileSelector/FileSelector.tsx";
import FileDetailsEditor from "../components/FileDetailsDisplayer/FileDetailsEditor.tsx";
import DiscogsSearcher from "../components/DiscogsSearcher/DiscogsSearcher.tsx";
import { useSelector } from "react-redux";
import { RootState } from "../store";
import "./Home.scss";

const Home = () => {
    const originalFile = useSelector((state: RootState) => state.file.originalFile);
    const originalTags = useSelector((state: RootState) => state.file.originalTags);

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