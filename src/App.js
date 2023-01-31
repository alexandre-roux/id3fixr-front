import "./App.css";
import {useState} from "react";

function App() {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedFile, setSelectedFile] = useState();
  const [tags, setTags] = useState()

  const changeHandler = (event) => {
    const file = event.target.files[0]
    setSelectedFile(file);

    window.jsmediatags.read(file, {
      onSuccess: function (result) {
        console.log(result.tags);
        setTags(result.tags)
        setIsSelected(true);
      },
      onError: function (error) {
        console.log(error);
      }
    });
  };

  return (
    <div>
      <input type="file" name="file" onChange={changeHandler}/>
      {isSelected ? (
        <div>
          <div>
            <h1>File info</h1>
            <p>Filename: {selectedFile.name}</p>
            <p>Filetype: {selectedFile.type}</p>
          </div>
          <div>
            <h1>ID3 tags</h1>
            <p>Title: {tags.title}</p>
            <p>Artist: {tags.artist}</p>
            <p>Album: {tags.album}</p>
            <p>Genre: {tags.genre}</p>
            <p>Year: {tags.year}</p>
            <p>Track: {tags.track}</p>
            <img
              src={`data:${tags.picture.format};base64,${btoa(
                new Uint8Array(tags.picture.data).reduce(
                  (data, byte) => data + String.fromCharCode(byte),
                  ""
                )
              )}`}
              alt={tags.picture.description}
            />
          </div>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
    </div>
  );
}

export default App;