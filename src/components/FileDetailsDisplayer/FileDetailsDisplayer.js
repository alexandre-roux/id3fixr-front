import React, { useEffect, useState } from "react";
import "./FileDetailsDisplayer.scss";

const FileDetailsDisplayer = (props) => {
  const [tags, setTags] = useState();
  const [selectedFile, setSelectedFile] = useState();

  useEffect(() => {
    if (selectedFile !== props.selectedFile) {
      setSelectedFile(props.selectedFile);

      window.musicmetadata(props.selectedFile, function (err, result) {
        if (err) throw err;
        props.setTags(result);
        setTags(result);
      });
    }
  }, [props.selectedFile]);

  return (
    <>
      {tags && (
        <div className="file-details">
          <div>
            <p>Filename: {props.selectedFile.name}</p>
          </div>
          <div>
            <p>Title: {tags.title}</p>
            <p>Artist: {tags.artist}</p>
            <p>Album: {tags.album}</p>
            <p>Genre: {tags.genre}</p>
            <p>Year: {tags.year}</p>
            <p>
              Track: {tags.track.no} of: {tags.track.of}
            </p>
          </div>
          {tags.picture.length > 0 && (
            <div>
              <img
                src={`data:${tags.picture[0].format};base64,${btoa(
                  new Uint8Array(tags.picture[0].data).reduce(
                    (data, byte) => data + String.fromCharCode(byte),
                    ""
                  )
                )}`}
                alt="Album cover"
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default FileDetailsDisplayer;
