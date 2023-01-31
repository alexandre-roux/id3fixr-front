import React, {useState} from 'react';
import FileSelector from "../components/FileSelector";
import FileInfoDisplayer from "../components/FileInfoDisplayer";

const Home = () => {
  const [selectedFile, setSelectedFile] = useState();

  return (
    <div>
      <FileSelector selectedFile={selectedFile} setSelectedFile={setSelectedFile}/>
      {selectedFile ? (
        <FileInfoDisplayer selectedFile={selectedFile}/>
      ) : (
        <p>Select a file to show details</p>
      )}
    </div>
  );
};

export default Home;