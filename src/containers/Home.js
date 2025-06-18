import React, {useContext} from "react";
import FileSelector from "../components/FileSelector/FileSelector";
import FileDetailsDisplayer from "../components/FileDetailsDisplayer/FileDetailsDisplayer";
import DiscogsSearcher from "../components/DiscogsSearcher/DiscogsSearcher";
import {FileContext} from "../context/FileContext"; // Adjust the import path
import "./Home.scss";

const Home = () => {
    const {originalFile, originalTags} = useContext(FileContext);

    return (
        <div className="home">
            <h1>Select a file</h1>
            <FileSelector/>
            {originalFile && (
                <>
                    <h1>File details</h1>
                    <FileDetailsDisplayer/>
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