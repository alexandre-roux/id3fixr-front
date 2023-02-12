import React, { useEffect, useState } from "react";
import "./FileInfoDisplayer.scss";

const FileInfoDisplayer = (props) => {
  const [tags, setTags] = useState();
  const [selectedFile, setSelectedFile] = useState();

  useEffect(() => {
    if (selectedFile !== props.selectedFile) {
      setSelectedFile(props.selectedFile);

      window.musicmetadata(props.selectedFile, function (err, result) {
        if (err) throw err;
        console.log(result);
      });
    }
  }, [props.selectedFile]);

  return (
    <>
      {tags && (
        <div className="file-informations">
          <div>
            <h1>File informations</h1>
            <p>Filename: {props.selectedFile.name}</p>
          </div>
          <div>
            <p>Title: {tags?.title}</p>
            <p>Artist: {tags?.artist}</p>
            <p>Album: {tags?.album}</p>
            <p>Genre: {tags?.genre}</p>
            <p>Year: {tags?.year}</p>
            <p>Track: {tags?.track}</p>
            {tags.picture && (
              <img
                src={`data:${tags.picture.format};base64,${btoa(
                  new Uint8Array(tags.picture.data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                  )
                )}`}
                alt={tags?.picture.description}
              />
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default FileInfoDisplayer;
