import React from "react";
import "./FileSelector.scss";
import { useDropzone } from "react-dropzone";

const FileSelector = ({ setSelectedFile }) => {
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "audio/mpeg": [],
    },
    onDrop: (acceptedFiles) => setSelectedFile(acceptedFiles[0]),
  });

  return (
    <div {...getRootProps({ className: "dropzone" })}>
      <input {...getInputProps()} />
      <div className="dropzone-text">
        <p>Drag 'n' drop some files here, or click to select files</p>
        <em>(Only *.mp3 files will be accepted)</em>
      </div>
    </div>
  );
};

export default FileSelector;
