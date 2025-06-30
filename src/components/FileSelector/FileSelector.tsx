import {useDropzone} from 'react-dropzone';
import {useDispatch} from 'react-redux';
import {resetNewTags, setFileInfo} from '../../store/fileSlice';
import {useFileObject} from '../../context/FileObjectContext';
import './FileSelector.scss';

//TODO handle a list of files to edit
//TODO maybe allow to drop anywhere on the page
//TODO check compatibility with other file types
const FileSelector = () => {
    const dispatch = useDispatch();
    const {setOriginalFile} = useFileObject();

    const {getRootProps, getInputProps} = useDropzone({
        accept: {
            'audio/mpeg': [],
        },
        onDrop: (acceptedFiles) => {
            if (acceptedFiles[0]) {
                console.log("Selected file: ", acceptedFiles[0].name);
                dispatch(resetNewTags());
                setOriginalFile(acceptedFiles[0]);
                dispatch(setFileInfo({
                    name: acceptedFiles[0].name,
                    size: acceptedFiles[0].size,
                    type: acceptedFiles[0].type,
                }));
            } else {
                setOriginalFile(null);
                dispatch(setFileInfo(null));
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