import React, { useState } from "react";
import FileSelector from "../components/FileSelector/FileSelector";
import FileInfoDisplayer from "../components/FileInfoDisplayer";
import DiscogsSearcher from "../components/DiscogsSearcher/DiscogsSearcher";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState();
  const [tags, setTags] = useState();

  return (
    <div>
      <FileSelector setSelectedFile={setSelectedFile} />
      {selectedFile && (
        <FileInfoDisplayer selectedFile={selectedFile} setTags={setTags} />
      )}
      {tags && <DiscogsSearcher selectedFile={selectedFile} tags={tags} />}
    </div>
  );
};

export default Home;
