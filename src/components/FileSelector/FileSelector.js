import React from "react";
import "./FileSelector.scss";
import {useDropzone} from "react-dropzone";
import {useMetadata} from "../../context/MetadataContext";

//TODO handle a list of files to edit
//TODO maybe allow to drop anywhere on the page
//TODO check compatibility with other file types
const FileSelector = () => {
    const {setFile, updateMetadata} = useMetadata();

    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            "audio/mpeg": [],
        },
        onDrop: (acceptedFiles) => {
            const file = acceptedFiles[0];
            console.log("Selected file:", file.path);
            if (file) {
                setFile(file);
                // Reset metadata when new file is selected
                updateMetadata({
                    title: '',
                    artist: '',
                    album: '',
                    genre: '',
                    year: '',
                    track: '',
                    image: 'https://www.chordie.com/images/no-cover.png'
                });
            }
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
