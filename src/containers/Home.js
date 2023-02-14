import React, { useState } from "react";
import FileSelector from "../components/FileSelector/FileSelector";
import FileDetailsDisplayer from "../components/FileDetailsDisplayer/FileDetailsDisplayer";
import DiscogsSearcher from "../components/DiscogsSearcher/DiscogsSearcher";
import "./Home.scss";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [tags, setTags] = useState();
  const [displayResults, setDisplayResults] = useState(true);
  const [title, setTitle] = useState();
  const [artist, setArtist] = useState();
  const [album, setAlbum] = useState();
  const [genre, setGenre] = useState();
  const [year, setYear] = useState();
  const [track, setTrack] = useState();
  const [image, setImage] = useState(
    "https://www.chordie.com/images/no-cover.png"
  );

  return (
    <div className="home">
      <h1>Select a file</h1>
      <FileSelector
        setSelectedFile={setSelectedFile}
        setTitle={setTitle}
        setArtist={setArtist}
        setAlbum={setAlbum}
        setGenre={setGenre}
        setYear={setYear}
        setTrack={setTrack}
        setImage={setImage}
      />
      {selectedFile && (
        <>
          <h1>File details</h1>
          <FileDetailsDisplayer
            selectedFile={selectedFile}
            setTags={setTags}
            setDisplayResults={setDisplayResults}
            title={title}
            setTitle={setTitle}
            artist={artist}
            setArtist={setArtist}
            album={album}
            setAlbum={setAlbum}
            genre={genre}
            setGenre={setGenre}
            year={year}
            setYear={setYear}
            track={track}
            setTrack={setTrack}
            image={image}
            setImage={setImage}
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
            setTitle={setTitle}
            setArtist={setArtist}
            setAlbum={setAlbum}
            setGenre={setGenre}
            setYear={setYear}
            setTrack={setTrack}
            setImage={setImage}
          />
        </>
      )}
    </div>
  );
};

export default Home;
