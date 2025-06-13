// src/containers/Home.js
import React from "react";
import FileSelector from "../components/FileSelector/FileSelector";
import FileDetailsDisplayer from "../components/FileDetailsDisplayer/FileDetailsDisplayer";
import DiscogsSearcher from "../components/DiscogsSearcher/DiscogsSearcher";
import {MetadataProvider, useMetadata} from "../context/MetadataContext";
import "./Home.scss";

const HomeContent = () => {
    const {state} = useMetadata();
    const {selectedFile, tags} = state;

    return (
        <div className="home">
            <h1>Select a file</h1>
            <FileSelector/>

            {selectedFile && (
                <>
                    <h1>File details</h1>
                    <FileDetailsDisplayer/>
                </>
            )}

            {tags && (
                <>
                    <h1>Discogs search results</h1>
                    <DiscogsSearcher/>
                </>
            )}
        </div>
    );
};

const Home = () => (
    <MetadataProvider>
        <HomeContent/>
    </MetadataProvider>
);

export default Home;