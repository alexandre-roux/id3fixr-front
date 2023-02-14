import React from "react";
import "./FileSelector.scss";
import {useDropzone} from "react-dropzone";

//TODO handle a list of files to edit
//TODO maybe allow to drop anywhere on the page
//TODO check compatibility with other file types
const FileSelector = (props) => {
  const {getRootProps, getInputProps} = useDropzone({
    accept: {
      "audio/mpeg": [],
    },
    onDrop: (acceptedFiles) => {
      props.setSelectedFile(acceptedFiles[0]);
      props.setTitle("");
      props.setArtist("");
      props.setAlbum("");
      props.setGenre("");
      props.setYear("");
      props.setTrack("");
      props.setImage("https://www.chordie.com/images/no-cover.png");
    },
  });

  return (
    <div className="file-selector">
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
