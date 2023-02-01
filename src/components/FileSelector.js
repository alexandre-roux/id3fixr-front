import React from 'react';

const FileSelector = ({setSelectedFile}) => {
  const changeHandler = (event) => {
    const file = event.target.files[0]
    setSelectedFile(file);
  }

  return (
    <input type="file" name="file" accept="audio/mpeg" onChange={changeHandler}/>
  );
};

export default FileSelector;