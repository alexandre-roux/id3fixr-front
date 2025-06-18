import React, {useContext} from 'react';
import {useDropzone} from 'react-dropzone';
import {FileContext} from '../../context/FileContext';
import './FileSelector.scss';

//TODO handle a list of files to edit
//TODO maybe allow to drop anywhere on the page
//TODO check compatibility with other file types
const FileSelector = () => {
    const {setOriginalFile, resetNewTags} = useContext(FileContext);

    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            'audio/mpeg': [],
        },
        onDrop: (acceptedFiles) => {
            console.log("Selected file:", acceptedFiles[0].path);
            resetNewTags();
            setOriginalFile(acceptedFiles[0]);
        },
    });

    return (
        <div className="file-selector">
            <div {...getRootProps({className: "dropzone"})}>
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