import React from "react";
import "./FileSelector.scss";
import {useDropzone} from "react-dropzone";

//TODO handle a list of files to edit
const FileSelector = ({ setSelectedFile }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "audio/mpeg": [],
    },
    onDrop: (acceptedFiles) => setSelectedFile(acceptedFiles[0]),
  });

  return (
    <div className="file-selector">
      <h1>Select a file</h1>
      <div {...getRootProps({ className: "dropzone" })}>
        <input {...getInputProps()} />
        <div className="dropzone-text">
          <p>Drag 'n' drop a file here, or click to select the file</p>
          <em>(Only *.mp3 files will be accepted)</em>
        </div>
      </div>
    </div>
  );
};

export default FileSelector;
