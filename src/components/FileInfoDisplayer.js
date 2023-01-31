import React, {useEffect, useState} from 'react';

const FileInfoDisplayer = ({selectedFile}) => {
  const [tags, setTags] = useState()

  useEffect(() => {
    window.jsmediatags.read(selectedFile, {
      onSuccess: function (result) {
        setTags(result.tags)
        console.log(result.tags);
      },
      onError: function (error) {
        console.log(error);
      }
    });
  }, [selectedFile])

  return (
    <>
      {tags &&
        <div>
          <div>
            <h1>File info</h1>
            <p>Filename: {selectedFile.name}</p>
            <p>Filetype: {selectedFile.type}</p>
          </div>
          <div>
            <h1>ID3 tags</h1>
            <p>Title: {tags?.title}</p>
            <p>Artist: {tags?.artist}</p>
            <p>Album: {tags?.album}</p>
            <p>Genre: {tags?.genre}</p>
            <p>Year: {tags?.year}</p>
            <p>Track: {tags?.track}</p>
            {tags.picture && <img
              src={`data:${tags.picture.format};base64,${btoa(
                new Uint8Array(tags.picture.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ""
                )
              )}`}
              alt={tags?.picture.description}
            />}
          </div>
        </div>
      }
    </>
  );
};

export default FileInfoDisplayer;