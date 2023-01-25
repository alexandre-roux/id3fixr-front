import "./App.css";
import {useState} from "react";

function App() {
  const [selectedFile, setSelectedFile] = useState();
  const [isSelected, setIsSelected] = useState(false);

  const changeHandler = (event) => {
    setSelectedFile(event.target.files[0]);
    setIsSelected(true);
  };

  return (
    <div>
      <input type="file" name="file" onChange={changeHandler}/>
      {isSelected ? (
        <div>
          <p>Filename: {selectedFile.name}</p>
          <p>Filetype: {selectedFile.type}</p>
          <p>Size in bytes: {selectedFile.size}</p>
          <p>
            lastModifiedDate: {selectedFile.lastModified}
          </p>
        </div>
      ) : (
        <p>Select a file to show details</p>
      )}
    </div>
  );
}

export default App;