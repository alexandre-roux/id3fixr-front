import React, { useState } from "react";
import FileSelector from "../components/FileSelector/FileSelector";
import FileInfoDisplayer from "../components/FileInfoDisplayer/FileInfoDisplayer";
import DiscogsSearcher from "../components/DiscogsSearcher/DiscogsSearcher";
import "./Home.scss";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [tags, setTags] = useState();

  return (
    <div className="home">
      <FileSelector setSelectedFile={setSelectedFile} />
      {selectedFile && (
        <FileInfoDisplayer selectedFile={selectedFile} setTags={setTags} />
      )}
      {tags && <DiscogsSearcher selectedFile={selectedFile} tags={tags} />}
    </div>
  );
};

export default Home;
