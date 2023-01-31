import "./App.css";
import {useState} from "react";
import ID3Writer from "browser-id3-writer"
import {saveAs} from 'file-saver';

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

    const reader = new FileReader();
    reader.onload = function () {
      const arrayBuffer = reader.result;
      // go next
      // arrayBuffer of song or empty arrayBuffer if you just want only id3 tag without song
      const writer = new ID3Writer(arrayBuffer);
      writer.setFrame('TIT2', 'Home')
        .setFrame('TPE1', ['Eminem', '50 Cent'])
        .setFrame('TALB', 'Friday Night Lights')
        .setFrame('TYER', 2004)
        .setFrame('TRCK', '6/8')
        .setFrame('TCON', ['Soundtrack'])
        .setFrame('TBPM', 128)
        .setFrame('WPAY', 'https://google.com')
        .setFrame('TKEY', 'Fbm')
      writer.addTag();
      const taggedSongBuffer = writer.arrayBuffer;
      const blob = writer.getBlob();
      saveAs(blob, 'song with tags.mp3');
    };
    reader.onerror = function () {
      // handle error
      console.error('Reader error', reader.error);
    };
    reader.readAsArrayBuffer(file);
  };

  return (
    <div>
      <input type="file" name="file" accept="audio/mpeg" onChange={changeHandler}/>
      {isSelected ? (
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
      ) : (
        <p>Select a file to show details</p>
      )}
    </div>
  );
}

export default App;