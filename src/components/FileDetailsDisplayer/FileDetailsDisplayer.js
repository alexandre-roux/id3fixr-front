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
        props.setDisplayResults(true);
        setTags(result);
      });
    }
  }, [props.selectedFile]);

  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      {tags && (
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="file-details">
            <div className="original-details">
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
                  Track: {tags.track.no}/{tags.track.of}
                </p>
              </div>
              <div className="album-cover">
                {tags.picture.length > 0 ? (
                  <img
                    src={`data:${tags.picture[0].format};base64,${btoa(
                      new Uint8Array(tags.picture[0].data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ""
                      )
                    )}`}
                    alt="Album cover"
                  />
                ) : (
                  <img
                    src="https://www.chordie.com/images/no-cover.png"
                    alt="No album cover"
                  />
                )}
              </div>
            </div>
            <div className="button">
              <input
                type="image"
                src="https://www.seekpng.com/png/full/23-238249_arrow-clipart-windows-back-button-logo-png.png"
                alt="Save new details"
                name="submit"
              />
            </div>
            <div className="new-details">
              <div>
                <p>New values:</p>
              </div>
              <div className="form-fields">
                <input
                  className="wide"
                  placeholder="Title"
                  value={props.title}
                  onChange={(e) => props.setTitle(e.target.value)}
                />
                <input
                  className="wide"
                  placeholder="Artist"
                  value={props.artist}
                  onChange={(e) => props.setArtist(e.target.value)}
                />
                <input
                  className="wide"
                  placeholder="Album"
                  value={props.album}
                  onChange={(e) => props.setAlbum(e.target.value)}
                />
                <input
                  placeholder="Genre"
                  value={props.genre}
                  onChange={(e) => props.setGenre(e.target.value)}
                />
                <input
                  placeholder="Year"
                  value={props.year}
                  onChange={(e) => props.setYear(e.target.value)}
                />
                <input
                  placeholder="Track"
                  value={props.track}
                  onChange={(e) => props.setTrack(e.target.value)}
                />
              </div>
              <div className="album-cover">
                <img src={props.image} alt="New album cover" />
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default FileDetailsDisplayer;
