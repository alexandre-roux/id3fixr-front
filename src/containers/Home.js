import React, {useState} from "react";
import FileSelector from "../components/FileSelector/FileSelector";
import FileDetailsDisplayer from "../components/FileDetailsDisplayer/FileDetailsDisplayer";
import DiscogsSearcher from "../components/DiscogsSearcher/DiscogsSearcher";
import "./Home.scss";
import AlbumDetailsDisplayer from "../components/AlbumDetailsDisplayer/AlbumDetailsDisplayer";

//TODO hide components instead of creating a new one everytime
const Home = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [tags, setTags] = useState();
  const [displayResults, setDisplayResults] = useState(false);
  const [displayAlbumDetails, setDisplayAlbumDetails] = useState(false);
  const [albumToDisplay, setAlbumToDisplay] = useState();

  return (
    <div className="home">
      <h1>Select a file</h1>
      <FileSelector setSelectedFile={setSelectedFile} />
      {selectedFile && (
        <>
          <h1>File informations</h1>
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
          {displayResults && (
            <DiscogsSearcher
              selectedFile={selectedFile}
              tags={tags}
              setDisplayResults={setDisplayResults}
              setDisplayAlbumDetails={setDisplayAlbumDetails}
              setAlbumToDisplay={setAlbumToDisplay}
            />
          )}
          {displayAlbumDetails && (
            <AlbumDetailsDisplayer
              albumToDisplay={albumToDisplay}
              setDisplayAlbumDetails={setDisplayAlbumDetails}
              setDisplayResults={setDisplayResults}
            />
          )}
        </>
      )}
    </div>
  );
};

export default Home;
