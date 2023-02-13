import React, { useState } from "react";
import FileSelector from "../components/FileSelector/FileSelector";
import FileDetailsDisplayer from "../components/FileDetailsDisplayer/FileDetailsDisplayer";
import DiscogsSearcher from "../components/DiscogsSearcher/DiscogsSearcher";
import "./Home.scss";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [tags, setTags] = useState();
  const [displayResults, setDisplayResults] = useState(true);

  return (
    <div className="home">
      <h1>Select a file</h1>
      <FileSelector setSelectedFile={setSelectedFile} />
      {selectedFile && (
        <>
          <h1>File details</h1>
          <FileDetailsDisplayer
            selectedFile={selectedFile}
            setTags={setTags}
            setDisplayResults={setDisplayResults}
          />
        </>
      )}
      {tags && (
        <>
          <h1>Discogs search results</h1>
          <DiscogsSearcher
            selectedFile={selectedFile}
            tags={tags}
            displayResults={displayResults}
            setDisplayResults={setDisplayResults}
          />
        </>
      )}
    </div>
  );
};

export default Home;
