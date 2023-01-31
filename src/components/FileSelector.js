import React from 'react';

const FileSelector = ({selectedFile, setSelectedFile}) => {
  const changeHandler = (event) => {
    const file = event.target.files[0]
    if (file !== selectedFile) {
      setSelectedFile(file);
    }
  }

  return (
    <input type="file" name="file" accept="audio/mpeg" onChange={changeHandler}/>
  );
};

export default FileSelector;